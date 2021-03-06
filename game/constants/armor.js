import { ARMOR } from './types';

export const STEEL_ARMOR = {
  name: 'Steel Armor',
  type: ARMOR,
  DEF: 10,
  emoji: '🛡',
  description: "DEF 10. It's made tough.",
};

export const LEATHER_ARMOR = {
  name: 'Leather Armor',
  type: ARMOR,
  DEF: 5,
  AGL: 5,
  emoji: '🛡',
  description:
    "DEF 5, AGL: 5. It's not the most durable thing, but at least you can move in it.",
};

export const JEWELED_ARMOR = {
  name: 'Jeweled Armor',
  type: ARMOR,
  DEF: 10,
  AGL: 10,
  emoji: '🛡',
  description: "DEF 10, AGL 10. It's _DAZZLING!_",
};

export const HEAVY_ARMOR = {
  name: 'Heavy Armor',
  type: ARMOR,
  DEF: 20,
  AGL: -5,
  emoji: '🛡',
  description:
    "DEF 20, AGL -5. It's a little heavy, but you'll get used to it!",
};

export const QUICK_ARMOR = {
  name: 'Quick Armor',
  type: ARMOR,
  DEF: 10,
  AGL: 20,
  emoji: '🛡',
  description: 'DEF 10, AGL 20. It breaths good- you feel light as a feather',
};
