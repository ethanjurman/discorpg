import { WING_ATTACK, BITE, TACKLE, DARK_CHARGE } from './attacks';

export const BAT = {
  id: 'bat',
  name: 'Bat',
  maxHP: 50,
  ATK: 10,
  CRIT: 5,
  DEF: 0,
  AGL: 10,
  attacks: [WING_ATTACK, WING_ATTACK, BITE],
};

export const SKELETON = {
  id: 'skeleton',
  name: 'Skeleton',
  maxHP: 70,
  ATK: 15,
  CRIT: 0,
  DEF: 5,
  AGL: 5,
  attacks: [SWIPE, TACKLE, TACKLE],
};

export const ZOMBIE = {
  id: 'zombie',
  name: 'Zombie',
  maxHP: 100,
  ATK: 10,
  CRIT: 5,
  DEF: 5,
  AGL: 0,
  attacks: [BITE, SWIPE, TACKLE, TACKLE],
};

export const DEMON = {
  id: 'demon',
  name: 'Demon',
  maxHP: 150,
  ATK: 20,
  CRIT: 5,
  DEF: 5,
  AGL: 5,
  attacks: [BITE, DARK_CHARGE],
};
