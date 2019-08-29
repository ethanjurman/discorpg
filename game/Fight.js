import { ATTACK, BLOCK, CHARGE } from './actions';

export class Fight {
  constructor(players, enemy) {
    this.players = players;
    this.enemy = enemy;
    this.turn = 0;

    this.actions = {};
  }

  isTurnReady() {
    return this.players.every(({ id }) => this.actions[id]);
  }

  setPlayerAction(id, action) {
    this.actions[id] = action;
  }

  advanceTurn() {
    this.turn = this.turn++;
    this.players.forEach(player => {
      const { id } = player;
      if (this.actions[id] === ATTACK) {
        player.attack(this.enemy);
      }
      player.setCharging(false);

      if (this.actions[id] === CHARGE) {
        console.log(`${player.name} is charging for their next attack!`);
        player.setCharging(true);
      }

      if (this.actions[id] === BLOCK) {
        console.log(`${player.name} took a defensive stance!`);
        player.setBlocking(true);
      }
    });
    if (this.enemy.currentHP <= 0) {
      console.log(`${this.enemy.name} got wrecked`);
    } else {
      console.log(`${this.enemy.name} turn to attack`);
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
}
