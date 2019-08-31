const getValue = (item, player) => {
  // if item is a function, call function with player
  if (typeof item === 'function') {
    return item(player);
  }
  // if item is a number, just return number
  if (typeof item === 'number') {
    return item;
  }
  // if item is anything else, just return 0
  return 0;
};

export class Player {
  constructor({ id, name }, logger) {
    this.id = id;
    this.name = name;
    this.maxHP = 80;
    this.currentHP = 80;
    this.logger = logger;

    this.ARMOR = null;
    this.WEAPON = null;
    this.ITEMS = [];

    this.charging = false;
    this.blocking = false;
  }

  getSTAT(stat) {
    const armorSTAT = getValue(this.ARMOR && this.ARMOR[stat], this);
    const weaponSTAT = getValue(this.WEAPON && this.WEAPON[stat], this);
    return this.ITEMS.reduce(
      (totalSTAT, item) => totalSTAT + getValue(item[stat], this),
      armorSTAT + weaponSTAT
    );
  }

  getMaxHP() {
    return this.maxHP + this.getSTAT('HP');
  }

  getCurrentHP() {
    return this.currentHP;
  }

  getATK() {
    return this.getSTAT('ATK');
  }

  getCRIT() {
    return this.getSTAT('CRIT');
  }

  getDEF() {
    return this.getSTAT('DEF');
  }

  getAGL() {
    return this.getSTAT('AGL');
  }

  setWEAPON(newWeapon) {
    this.WEAPON = newWeapon;
    if (newWeapon.HP) {
      this.currentHP += getValue(newWeapon.HP, this);
      this.maxHP += getValue(newWeapon.HP, this);
    }
  }

  setARMOR(newArmor) {
    this.ARMOR = newArmor;
    if (newArmor.HP) {
      this.currentHP += getValue(newArmor.HP, this);
      this.maxHP += getValue(newArmor.HP, this);
    }
  }

  setCharging(value) {
    this.charging = value;
  }

  setBlocking(value) {
    this.blocking = value;
  }

  addITEM(item) {
    this.ITEMS.push(item);
    if (item.HP) {
      this.currentHP += getValue(item.HP, this);
      this.maxHP += getValue(item.HP, this);
    }
  }

  getAttackPower() {
    const critChance = this.charging ? this.getCRIT() / 2 : this.getCRIT();
    const isCrit = critChance >= Math.random() * 100;
    const critMultiplier = isCrit ? 2 : 1;
    const chargingMultiplier = this.charging ? 3 : 1;
    if (isCrit) {
      this.logger(`It's gonna be critical!`);
    }
    return this.getATK() * critMultiplier * chargingMultiplier;
  }

  getDefense() {
    if (this.blocking) {
      return this.getDEF() * 3;
    }
    return this.getDEF();
  }

  getAgility() {
    if (this.blocking) {
      return Math.floor(this.getAGL() / 2);
    }
    return this.getAGL();
  }

  attack(enemy) {
    const enemyDodged = enemy.getAGL() >= Math.random() * 100;
    if (enemyDodged) {
      this.logger(`${this.name} attacks! ${enemy.name} dodged the attack!`);
    } else {
      const attackPower = this.getAttackPower();
      const attackDamage = Math.max(0, attackPower - enemy.getDEF());
      enemy.currentHP -= attackDamage;
      this.logger(
        `${this.name} attacks! deals ${attackDamage} damage to ${enemy.name}`
      );
    }
  }
}
