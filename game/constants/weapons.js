import { WEAPON } from './types';

export const SWORD = {
  name: 'Sword',
  type: WEAPON,
  ATK: 10,
  CRIT: 5,
  emoji: '⚔',
  description:
    'ATK: 10, CRIT: 5. Basic sword. Good for swinging _and_ stabbing!',
};

export const BOW = {
  name: 'Bow',
  type: WEAPON,
  ATK: 10,
  CRIT: 5,
  emoji: '🏹',
  description:
    'ATK: 10, CRIT: 5. Everything is target practice when you got arrows!',
};

export const DAGGER = {
  name: 'Dagger',
  type: WEAPON,
  ATK: 7,
  CRIT: 10,
  emoji: '🗡',
  description: "ATK 7, CRIT 10. Watch out... it's sharp!",
};

export const HEAVY_AXE = {
  name: 'Heavy Axe',
  type: WEAPON,
  ATK: 20,
  AGL: -5,
  emoji: '⚔',
  description:
    'ATK 20, AGL -5. _"I know it weighs a lot, but just think about all that slamming into a bear!"_',
};

export const FLAMING_SWORD = {
  name: 'Flaming Sword',
  type: WEAPON,
  ATK: 15,
  CRIT: 10,
  emoji: '⚔',
  description:
    "ATK 15, CRIT 10. The sword has decorations of flames on it. As far as you can tell, it doesnt't actually produce fire.",
};

export const JAGGED_DAGGER = {
  name: 'Jagged Dagger',
  type: WEAPON,
  ATK: 10,
  CRIT: 15,
  emoji: '🗡',
  description: "ATK 10, CRIT 15. It's curves look both sexy _and dangerous_!",
};

export const POWER_ARROWS = {
  name: 'Power Arrows',
  type: WEAPON,
  ATK: 10,
  CRIT: 10,
  AGL: 10,
  emoji: '🏹',
  description:
    'ATK 10, CRIT 10, AGL 10. A heavy bow, with even heavier arrows.',
};
