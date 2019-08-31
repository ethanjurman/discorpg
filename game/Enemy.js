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
    // { name, numberOfAttacks, beforeAttack, aftertAttack }
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

  getAttackPower() {
    const isCrit = this.getCRIT() >= Math.random() * 100;
    const critMultiplier = isCrit ? 2 : 1;
    if (isCrit) {
      this.logger(`It's gonna be critical!`);
    }
    return this.getATK() * critMultiplier;
  }

  attack(players) {
    const turnAttack = this.getTurnAttack();
    turnAttack.beforeAttack && turnAttack.beforeAttack(this, players)
    ;[...Array(turnAttack.numberOfAttacks)].forEach(attack => {
      const player = players[Math.floor(Math.random() * players.length)];
      const playerDodged = player.getAgility() >= Math.random() * 100;
      if (playerDodged) {
        this.logger(`${this.name} attacks! ${player.name} dodged the attack!`);
      } else {
        const attackPower = this.getAttackPower();
        const attackDamage = Math.max(0, attackPower - player.getDefense());
        this.logger(
          `${this.name} attacks! deals ${attackDamage} damage to ${player.name}`
        );
        player.currentHP -= attackDamage;
      }
    });
    turnAttack.afterAttack && turnAttack.afterAttack(this, players);
  }
}
