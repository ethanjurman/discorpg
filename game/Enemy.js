export class Enemy {
  constructor({ id, name, maxHP, ATK, CRIT, DEF, AGL, attacks }, logger) {
    this.id = id;
    this.name = name;
    this.maxHP = maxHP;
    this.currentHP = maxHP;
    this.ATK = ATK;
    this.CRIT = CRIT;
    this.DEF = DEF;
    this.AGL = AGL;
    this.attacks = attacks;
    this.logger = logger;
    // attack structure should be the following
    // { name, numberOfAttacks, beforeAttack, onHit, afterAttack }
  }

  getMaxHP() {
    return this.maxHP;
  }

  getCurrentHP() {
    return this.currentHP;
  }

  getATK() {
    return this.ATK;
  }

  getCRIT() {
    return this.CRIT;
  }

  getDEF() {
    return this.DEF;
  }

  getAGL() {
    return this.AGL;
  }

  getTurnAttack() {
    return this.attacks[Math.floor(Math.random() * this.attacks.length)];
  }

  async getAttackPower() {
    const isCrit = this.getCRIT() >= Math.random() * 100;
    const critMultiplier = isCrit ? 2 : 1;
    if (isCrit) {
      await this.logger(`It's gonna be critical!`);
    }
    return this.getATK() * critMultiplier;
  }

  async attack(players) {
    const turnAttack = this.getTurnAttack();
    turnAttack.beforeAttack && turnAttack.beforeAttack(this, players);
    const attacksArray = [...Array(turnAttack.numberOfAttacks)];
    for (const __attack in attacksArray) {
      const player = players[Math.floor(Math.random() * players.length)];
      const playerDodged = player.getAgility() >= Math.random() * 100;
      if (playerDodged) {
        await this.logger(
          `${this.name} attacks! ${player.name} dodged the attack!`
        );
      } else {
        if (turnAttack.onHit) {
          turnAttack.onHit(this, player);
        }
        const attackPower = await this.getAttackPower();
        const attackDamage = Math.max(0, attackPower - player.getDefense());
        await this.logger(
          `${this.name} attacks! deals ${attackDamage} damage to ${player.name}`
        );
        player.currentHP -= attackDamage;
      }
    }
    turnAttack.afterAttack && turnAttack.afterAttack(this, players);
  }
}
