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

  addPlayer({ id, name }) {
    const newPlayer = new Player(
      { id, name },
      this.messenger.makeMessage.bind(this.messenger)
    );
    // TODO, build intro shop keep
    newPlayer.setWEAPON({ name: 'axe', ATK: 10, CRIT: 10 });
    newPlayer.setARMOR({ name: 'shield', DEF: 5, AGL: 0 });

    this.players.push(newPlayer);
    this.messenger.makeMessage(`${name} has joined the party!`);
  }

  welcomeMessage() {
    this.messenger.makeMessage('A new adventure awaits ye!!');
    this.messenger.makeMessage(
      'simply type `/join {name}` so we know what to call you!'
    );
    this.messenger.makeMessage(
      'to then begin, type `/start game` after all players are ready!'
    );
  }

  startGame() {
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
    this.fightRound();
  }

  fightRound() {
    this.messenger.makeMessage('Fight thingy');
    this.messenger.makeMessageWithOptions({
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
      callbackOnFinish: collection => {
        this.fight.advanceTurn();
        this.fight.healthReadout();
        this.fightRound();
      },
    });
  }
}
