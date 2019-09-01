import { Player } from './Player';
import { Enemy } from './Enemy';
import { Fight } from './Fight';
import { ATTACK, BLOCK, CHARGE } from './constants/actions';
import { WARRIOR, RANGER, THIEF } from './constants/jobs';
import { ENEMY_BATTLE, START_CAMPAIGN, SHOP } from './constants/events';
import { WEAPON, ARMOR, ITEM } from './constants/types';

export class GameRPG {
  constructor(campaign, messenger) {
    this.messenger = messenger;
    this.players = [];
    this.playersMap = {};
    this.fight;
    this.campaign = campaign;
    this.campaignIndex = -1;
    this.itemIndex = 0;
  }

  async addPlayer({ id, name, job }) {
    const newPlayer = new Player(
      { id, name },
      await this.messenger.makeMessage.bind(this.messenger)
    );
    // TODO, build intro shop keep
    switch (job) {
      case WARRIOR: {
        newPlayer.setWEAPON({ name: 'Sword', ATK: 10, CRIT: 5 });
        newPlayer.setARMOR({ name: 'Steel Armor', DEF: 8, AGL: 0 });
        break;
      }
      case RANGER: {
        newPlayer.setWEAPON({ name: 'Bow', ATK: 10, CRIT: 5 });
        newPlayer.setARMOR({ name: 'Leather Armor', DEF: 5, AGL: 5 });
        break;
      }
      case THIEF: {
        newPlayer.setWEAPON({ name: 'Dagger', ATK: 7, CRIT: 10 });
        newPlayer.addITEM({ name: 'Crit Ring', CRIT: 5 });
        break;
      }
    }

    this.players.push(newPlayer); // easier for list
    this.playersMap[id] = newPlayer; // easier for id indexing
    await this.messenger.makeMessage(
      `${name} the ${job} has joined the party!`
    );
  }

  async continueCampaign() {
    this.campaignIndex++;
    const campaignItem = this.campaign[this.campaignIndex];
    console.log({
      campaignIndex: this.campaignIndex,
      event: campaignItem.event,
    });
    switch (campaignItem.event) {
      case START_CAMPAIGN:
        this.setupCampaign();
        break;
      case ENEMY_BATTLE:
        const enemy = new Enemy(
          campaignItem.enemy,
          this.messenger.makeMessage.bind(this.messenger)
        );
        this.fight = new Fight(
          this.players,
          enemy,
          this.messenger.makeMessage.bind(this.messenger)
        );
        await this.messenger.makeMessage(campaignItem.intro);
        await this.fight.healthReadout();
        await this.fightRound();
        break;
      case SHOP:
        const shopItem = campaignItem.items[0];
        await this.startShop(shopItem);
        break;
      default:
        console.log(`${campaignItem} is not a valid campaign type`);
    }
  }

  async setupCampaign() {
    await this.messenger.makeMessage('A new adventure awaits ye!!');
    await this.messenger.makeMessageWithOptions({
      color: 'BLUE',
      maxResponses: Infinity,
      options: [
        {
          emoji: '⚔',
          title: WARRIOR,
          message:
            'Cut a path into your enemies using a blade of hardened steel. Starts with a Sword and Steel Armor',
        },
        {
          emoji: '🏹',
          title: RANGER,
          message:
            'Take aim at your enemies from afar with your bow and arrow. Starts with Bow and Leather Armor',
        },
        {
          emoji: '🗡',
          title: THIEF,
          message:
            'Use the shadows and strike quick before you are ever seen. Starts with a Dagger and Crit Ring',
        },
        {
          emoji: '⛵',
          title: 'Start Campaign',
          message: 'When all players are ready, set sail on your adventure!',
        },
      ],
      callbackOnResponse: async (
        element,
        collector,
        userReactionMap,
        userDataMap
      ) => {
        for (const id in userReactionMap) {
          // start the game if someone selects Start Campaign
          if (userReactionMap[id] === '⛵') {
            collector.stop();
          }

          // add the player to the game
          if (this.players.some(({ id: playerId }) => playerId === id)) {
            // this player has already been added
            continue;
          }

          const name = userDataMap[id].toString();
          if (userReactionMap[id] === '⚔') {
            this.addPlayer({ id, name, job: WARRIOR });
          }
          if (userReactionMap[id] === '🏹') {
            this.addPlayer({ id, name, job: RANGER });
          }
          if (userReactionMap[id] === '🗡') {
            this.addPlayer({ id, name, job: THIEF });
          }
        }
      },
      callbackOnFinish: async collection => {
        await this.continueCampaign();
      },
    });
  }

  async fightRound() {
    await this.messenger.makeMessageWithOptions({
      color: 'ORANGE',
      maxResponses: this.players.length,
      options: [
        {
          emoji: '⚔',
          title: 'Attack',
          message: 'Launch an attack at your foes',
        },
        {
          emoji: '🛡',
          title: 'Block',
          message:
            'Take a defensive stance, making it harder to dodge, but increasing defensive power',
        },
        {
          emoji: '🔥',
          title: 'Charge',
          message:
            'Take an offensive stance, making it harder to crit, but increasing attack next turn.',
        },
      ],
      callbackOnResponse: (element, collector, userReactionMap) => {
        this.players.forEach(({ id }) => {
          if (userReactionMap[id] === '⚔') {
            this.fight.setPlayerAction(id, ATTACK);
          }
          if (userReactionMap[id] === '🛡') {
            this.fight.setPlayerAction(id, BLOCK);
          }
          if (userReactionMap[id] === '🔥') {
            this.fight.setPlayerAction(id, CHARGE);
          }
        });
      },
      callbackOnFinish: async collection => {
        await this.fight.advanceTurn();
        await this.fight.healthReadout();
        if (this.fight.enemy.currentHP <= 0) {
          await this.continueCampaign();
        } else {
          await this.fightRound();
        }
      },
    });
  }

  async startShop() {
    const eventItem = this.campaign[this.campaignIndex];
    const shopItem = eventItem.items[this.itemIndex];
    const { emoji, name, description, type } = shopItem;
    await this.messenger.makeMessageWithOptions({
      color: 'GREEN',
      maxResponses: 1,
      options: [
        {
          emoji,
          title: name,
          message: description,
        },
        {
          emoji: '✋',
          title: 'Pass',
          message: "Don't take item",
        },
      ],
      callbackOnResponse: (
        element,
        collector,
        userReactionMap,
        userDataMap
      ) => {
        for (const id in userReactionMap) {
          if (userReactionMap[id] === emoji) {
            // someone took the item
            switch (type) {
              case WEAPON:
                this.playersMap[id].setWEAPON(shopItem);
                break;
              case ARMOR:
                this.playersMap[id].setARMOR(shopItem);
                break;
              case ITEM:
                this.playersMap[id].addITEM(shopItem);
                break;
              default:
                console.log(`${type} is not item type`);
            }
            collector.stop();
          }
        }
        if ((Object.keys(userReactionMap).length = this.players.length)) {
          // everyone passed the item
          collector.stop();
        }
      },
      callbackOnFinish: async collection => {
        const shop = this.campaign[this.campaignIndex];
        if (this.itemIndex >= eventItem.items.length - 1) {
          this.itemIndex = 0;
          await this.continueCampaign();
        } else {
          this.itemIndex++;
          await this.startShop(shop[this.itemIndex]);
        }
      },
    });
  }
}
