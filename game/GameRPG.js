import { Player } from './Player';
import { Enemy } from './Enemy';
import { Fight } from './Fight';
import { ATTACK, BLOCK, CHARGE } from './actions';

export class GameRPG {
  constructor(messenger) {
    this.messenger = messenger;
    this.players = [];
    this.fight;
  }

  async addPlayer({ id, name }) {
    const newPlayer = new Player(
      { id, name },
      await this.messenger.makeMessage.bind(this.messenger)
    );
    // TODO, build intro shop keep
    newPlayer.setWEAPON({ name: 'axe', ATK: 10, CRIT: 10 });
    newPlayer.setARMOR({ name: 'shield', DEF: 5, AGL: 0 });

    this.players.push(newPlayer);
    await this.messenger.makeMessage(`${name} has joined the party!`);
  }

  async welcomeMessage() {
    await this.messenger.makeMessage('A new adventure awaits ye!!');
    await this.messenger.makeMessage(
      'simply type `/join {name}` so we know what to call you!'
    );
    await this.messenger.makeMessage(
      'to then begin, type `/start game` after all players are ready!'
    );
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
