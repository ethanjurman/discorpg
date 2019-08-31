import { Player } from './Player';
import { Enemy } from './Enemy';
import { Fight } from './Fight';
import { ATTACK, BLOCK, CHARGE } from './actions';
import { WARRIOR, RANGER, THIEF } from './jobs';

export class GameRPG {
  constructor(messenger) {
    this.messenger = messenger;
    this.players = [];
    this.fight;
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

    this.players.push(newPlayer);
    await this.messenger.makeMessage(`${name} has joined the party!`);
  }

  async welcomeMessage() {
    await this.messenger.makeMessage('A new adventure awaits ye!!');
  }

  async startGame() {
    const atk1 = {
      name: 'wing attack',
      numberOfAttacks: 2,
      beforeAttack: () => console.log('WING ATTACK!! (2 hits)'),
    };

    const enemy1 = new Enemy(
      {
        id: 'bat1',
        name: 'Bat',
        maxHP: 70,
        ATK: 10,
        CRIT: 5,
        DEF: 5,
        AGL: 5,
        attacks: [atk1],
      },
      this.messenger.makeMessage.bind(this.messenger)
    );

    this.fight = new Fight(
      this.players,
      enemy1,
      this.messenger.makeMessage.bind(this.messenger)
    );
    await this.fight.healthReadout();
    await this.fightRound();
  }

  async setupCampaign() {
    await this.messenger.makeMessageWithOptions({
      color: 'BLUE',
      maxResponses: Infinity,
      options: [
        {
          emoji: '⚔',
          title: 'Warrior',
          message:
            'Cut a path into your enemies using a blade of hardened steel. Starts with a Sword and Steel Armor',
        },
        {
          emoji: '🏹',
          title: 'Ranger',
          message:
            'Take aim at your enemies from afar with your bow and arrow. Starts with Bow and Leather Armor',
        },
        {
          emoji: '🗡',
          title: 'Thief',
          message:
            'Use the shadows and strike quick before you are ever seen. Starts with a Dagger and Crit Ring',
        },
        {
          emoji: '⛵',
          title: 'Start Campaign',
          message: 'When all players are ready, set sail on your adventure!',
        },
      ],
      callbackOnResponse: (
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
        await this.startGame();
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
        await this.fightRound();
      },
    });
  }
}
