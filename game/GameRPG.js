import { Player } from './Player';
import { Enemy } from './Enemy';
import { Fight } from './Fight';
import { ATTACK, BLOCK, CHARGE } from './constants/actions';
import { WARRIOR, RANGER, THIEF } from './constants/jobs';
import {
  ENEMY_BATTLE,
  START_CAMPAIGN,
  SHOP,
  PLAYER_EVENT,
  MESSAGE,
} from './constants/events';
import { WEAPON, ARMOR, ITEM } from './constants/types';
import { SWORD, BOW, DAGGER } from './constants/weapons';
import { CRIT_RING } from './constants/items';
import { STEEL_ARMOR, LEATHER_ARMOR } from './constants/armor';

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

  async addPlayer({ id, name, user, job }) {
    const newPlayer = new Player(
      { id, name, user },
      await this.messenger.makeMessage.bind(this.messenger)
    );
    switch (job) {
      case WARRIOR: {
        newPlayer.setWEAPON(SWORD);
        newPlayer.setARMOR(STEEL_ARMOR);
        break;
      }
      case RANGER: {
        newPlayer.setWEAPON(BOW);
        newPlayer.setARMOR(LEATHER_ARMOR);
        break;
      }
      case THIEF: {
        newPlayer.setWEAPON(DAGGER);
        newPlayer.addITEM(CRIT_RING);
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
        await this.messenger.makeMessage(campaignItem.intro);
        await this.startShop();
        break;
      case PLAYER_EVENT:
        await this.messenger.makeMessage(campaignItem.intro);
        await this.playerEvent();
        break;
      case MESSAGE:
        await this.messenger.makeMessage(campaignItem.intro);
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

          const user = userDataMap[id];
          const name = user.toString();
          if (userReactionMap[id] === '⚔') {
            await this.addPlayer({ id, name, user, job: WARRIOR });
          }
          if (userReactionMap[id] === '🏹') {
            await this.addPlayer({ id, name, user, job: RANGER });
          }
          if (userReactionMap[id] === '🗡') {
            await this.addPlayer({ id, name, user, job: THIEF });
          }
          await this.messenger.makePlayerMessage(this.playersMap[id]);
        }
      },
      callbackOnFinish: async () => {
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
      callbackOnFinish: async () => {
        await this.fight.advanceTurn();
        if (this.fight.players.length === 0) {
          await this.messenger.makeMessage('All the players have fallen.');
          return;
        }
        await this.fight.healthReadout();
        for (const playerIndex in this.players) {
          await this.players[playerIndex].updatePlayerMessage();
        }
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
      callbackOnResponse: (element, collector, userReactionMap) => {
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
      callbackOnFinish: async () => {
        const shop = this.campaign[this.campaignIndex];
        for (const playerIndex in this.players) {
          await this.players[playerIndex].updatePlayerMessage();
        }
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

  async playerEvent() {
    const eventItem = this.campaign[this.campaignIndex];
    const { color, options, onResponse, onFinish } = eventItem;
    const maxResponses = options.reduce(
      (responses, { maxRespondents }) => responses + maxRespondents,
      0
    );
    await this.messenger.makeMessageWithOptions({
      color,
      maxResponses,
      options,
      callbackOnResponse: (
        element,
        collector,
        userReactionMap,
        userDataMap
      ) => {
        const playerIds = Object.keys(userReactionMap);
        if (
          playerIds.length >= maxResponses ||
          playerIds.length >= this.players.length
        ) {
          collector.stop();
        }
        if (onResponse) {
          onResponse(userReactionMap, userDataMap);
        }
      },
      callbackOnFinish: async userReactionMap => {
        for (const playerIndex in this.players) {
          await this.players[playerIndex].updatePlayerMessage();
        }
        if (onFinish) {
          await onFinish(userReactionMap, this.playersMap);
        }
        await this.continueCampaign();
      },
    });
  }
}
