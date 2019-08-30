export class GameRPG {
  constructor(messenger) {
    this.messenger = messenger;
    this.collector = null;
  }

  startGame() {
    this.messenger.makeMessage('Time to start the game!!');
    this.messenger.makeMessage('Please type out your name!');
    this.messenger.makeMessageWithOptions({
      color: 'BLUE',
      options: [
        {
          emoji: '⛵',
          title: 'Set Sail for Adventure',
          message: 'tap when all players are done registering',
        },
      ],
    });
  }

  fightRound() {
    this.messenger.makeMessage('Fight thingy');
    this.messenger.makeMessageWithOptions({
      color: 'ORANGE',
      maxResponses: 3,
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
      callbackOnResponse: response => {
        console.log('RESPONSE', response.emoji.name);
        if (response.emoji.name === '🔥') {
          this.collector.stop();
        }
      },
      callbackOnFinish: collected => {
        console.log('FINISHED', collected.size);
      },
      getCollector: collector => {
        this.collector = collector;
      },
    });
  }
}
