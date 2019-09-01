export const WING_ATTACK = {
  name: 'Wing Attack',
  numberOfAttacks: 2,
  beforeAttack: enemy => enemy.logger('WING ATTACK!! (2 hits)'),
};

export const BITE = {
  name: 'Bite',
  numberOfAttacks: 1,
  beforeAttack: enemy => enemy.logger('BITE!! (healing hit)'),
  afterAttack: enemy => {
    enemy.currentHP += 5;
  },
};

export const SWIPE = {
  name: 'Swipe',
  numberOfAttacks: 2,
};

export const TACKLE = {
  name: 'Tackle',
  numberOfAttacks: 1,
};

export const FURY_ATTACK = {
  name: 'Fury attack',
  numberOfAttacks: 4,
};

export const DARK_CHARGE = {
  name: 'Dark Charge',
  numberOfAttacks: 0,
  afterAttack: enemy => (enemy.ATK += enemy.ATK + 5),
};
