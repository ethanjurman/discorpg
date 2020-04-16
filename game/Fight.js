// LEGACY
import { ATTACK, BLOCK, CHARGE } from './constants/actions';

export class Fight {
  constructor(players, enemy, logger = console.log) {
    this.players = players;
    this.enemy = enemy;
    this.turn = 0;
    this.logger = logger;

    this.actions = {};
  }

  isTurnReady() {
    return this.players.every(({ id }) => this.actions[id]);
  }

  setPlayerAction(id, action) {
    this.actions[id] = action;
  }

  async advanceTurn() {
    this.turn = this.turn++;

    for (const playerIndex in this.players) {
      const player = this.players[playerIndex];
      const { id } = player;
      if (this.actions[id] === ATTACK) {
        await player.attack(this.enemy);
      }
      player.setCharging(false);

      if (this.actions[id] === CHARGE) {
        await this.logger(`${player.name} is charging for their next attack!`);
        player.setCharging(true);
      }

      if (this.actions[id] === BLOCK) {
        await this.logger(`${player.name} took a defensive stance!`);
        player.setBlocking(true);
      }
    }

    if (this.enemy.currentHP <= 0) {
      await this.logger(`${this.enemy.name} got wrecked`);
    } else {
      await this.logger(`${this.enemy.name}'s turn to attack`);
      await this.enemy.attack(this.players);
    }

    // clear blocking
    this.players.forEach((player) => {
      player.setBlocking(false);
    });
    // remove dead players
    for (const index in this.players) {
      const player = this.players[index];
      if (player.currentHP <= 0) {
        await this.logger(`💀 ${player.name} has been slained!`);
        this.players.splice(index, 1);
      }
    }
    // clear actions
    this.actions = {};
  }

  async healthReadout() {
    for (const playerIndex in this.players) {
      const player = this.players[playerIndex];
      await this.logger(`${player.name}'s HP: ${player.currentHP}`);
    }
    await this.logger(`enemy health: ${this.enemy.currentHP}`);
  }
}
