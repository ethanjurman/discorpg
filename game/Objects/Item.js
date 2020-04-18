import { createUniqueId, setObjectToId } from './methods';

export const WEAPON_TYPE = 'WEAPON_TYPE';
export const EQUIPMENT_TYPE = 'EQUIPMENT_TYPE';
export const USE_TYPE = 'USE_TYPE';

export class Item {
  constructor({
    name = '',
    type = '',
    actions = [],
    strMod = null,
    dexMod = null,
    intMod = null,
    id = createUniqueId(),
  } = {}) {
    this.name = name;
    this.type = type;
    this.actions = actions;
    this.strMod = strMod;
    this.dexMod = dexMod;
    this.intMod = intMod;
    this.id = id;
    this.__objectName = 'ITEM';
    setObjectToId(id, this);
    Object.freeze(this);
  }
}

const isItem = (object) => object.__objectName === 'ITEM';

export const assertItem = (item) => {
  if (!isItem(item)) {
    throw new Error('EXPECTED_ITEM_OBJECT');
  }
};

// getters

export const getName = (item) => {
  assertItem(item);
  return item.name;
};

export const getType = (item) => {
  assertItem(item);
  return item.type;
};

export const getActions = (item) => {
  assertItem(item);
  return item.actions;
};

export const getStrMod = (item) => {
  assertItem(item);
  return item.strMod || 0;
};

export const getDexMod = (item) => {
  assertItem(item);
  return item.dexMod || 0;
};

export const getIntMod = (item) => {
  assertItem(item);
  return item.intMod || 0;
};

// setters

export const setName = (item, newName) => {
  assertItem(item);
  return new Item({ ...item, name: newName });
};

export const setType = (item, newType) => {
  assertItem(item);
  return new Item({ ...item, type: newType });
};

export const setActions = (item, newActions) => {
  assertItem(item);
  return new Item({ ...item, actions: newActions });
};

export const setStrMod = (item, newStrMod) => {
  assertItem(item);
  return new Item({ ...item, strMod: newStrMod });
};

export const setDexMod = (item, newDexMod) => {
  assertItem(item);
  return new Item({ ...item, dexMod: newDexMod });
};

export const setIntMod = (item, newIntMod) => {
  assertItem(item);
  return new Item({ ...item, intMod: newIntMod });
};
