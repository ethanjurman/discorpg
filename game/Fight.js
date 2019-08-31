import { ATTACK, BLOCK, CHARGE } from './actions';

export class Fight {
  constructor(players, enemy, logger = console.log) {
    this.players = players;
    this.enemy = enemy;
    this.turn = 0;
    this.logger = logger;

    this.actions = {};
    this.healthReadout();
  }

  isTurnReady() {
    return this.players.every(({ id }) => this.actions[id]);
  }

  setPlayerAction(id, action) {
    this.actions[id] = action;
  }

  advanceTurn() {
    this.turn = this.turn++;
    console.log('ACTIONS:', Object.keys(this.actions));
    console.log('PLAYERS:', this.players.map(player => player.id));

    this.players.forEach(player => {
      const { id } = player;
      if (this.actions[id] === ATTACK) {
        player.attack(this.enemy);
      }
      player.setCharging(false);

      if (this.actions[id] === CHARGE) {
        this.logger(`${player.name} is charging for their next attack!`);
        player.setCharging(true);
      }

      if (this.actions[id] === BLOCK) {
        this.logger(`${player.name} took a defensive stance!`);
        player.setBlocking(true);
      }
    });
    if (this.enemy.currentHP <= 0) {
      this.logger(`${this.enemy.name} got wrecked`);
    } else {
      this.logger(`${this.enemy.name} turn to attack`);
      this.enemy.attack(this.players);
    }

    // clear blocking
    this.players.forEach(player => {
      player.setBlocking(false);
    });
    // remove dead players
    this.players.forEach((player, index) => {
      if (player.currentHP <= 0) {
        this.players.splice(index, 1);
      }
    });
    // clear actions
    this.actions = {};
  }

  healthReadout() {
    this.logger('----------------');
    this.players.map(p => {
      this.logger(`${p.name}'s HP: ${p.currentHP}`);
    });
    this.logger(`enemy health: ${this.enemy.currentHP}`);
    this.logger('----------------');
  }
}
