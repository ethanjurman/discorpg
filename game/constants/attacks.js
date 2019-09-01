export const WING_ATTACK = {
  name: 'Wing Attack',
  numberOfAttacks: 2,
  beforeAttack: enemy => enemy.logger('WING ATTACK!! (2 hits)'),
};

export const BITE = {
  name: 'Bite',
  numberOfAttacks: 1,
  beforeAttack: enemy => enemy.logger('BITE!! (healing hit)'),
  onHit: enemy => {
    enemy.currentHP += enemy.ATK;
  },
};

export const SWIPE = {
  name: 'Swipe',
  numberOfAttacks: 2,
  beforeAttack: enemy => enemy.logger('SWIPE!! (2 hits)'),
};

export const TACKLE = {
  name: 'Tackle',
  numberOfAttacks: 1,
  beforeAttack: enemy => {
    enemy.ATK += 10;
    enemy.logger('TACKLE!!');
  },
  afterAttack: enemy => {
    enemy.ATK -= 10;
  },
};

export const FURY_ATTACK = {
  name: 'Fury attack',
  numberOfAttacks: 4,
  beforeAttack: enemy => enemy.logger('FURY ATTACK!! (4 hits)'),
};

export const DARK_CHARGE = {
  name: 'Dark Charge',
  numberOfAttacks: 0,
  beforeAttack: enemy =>
    enemy.logger('DARK CHARGE!! (Enemy increases their attack power)'),
  afterAttack: enemy => (enemy.ATK += enemy.ATK + 5),
};
