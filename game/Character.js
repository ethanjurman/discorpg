export const PLAYER_TYPE = 'PLAYER_TYPE';
export const NPC_TYPE = 'NPC_TYPE';
export const ENEMY_TYPE = 'ENEMY_TYPE';
export const UNDEFINED = 'UNDEFINED';

const objectName = 'CHARACTER';

export class Character {
  constructor({
    name = UNDEFINED,
    type = UNDEFINED,
    health = 99,
    dialog = [],
    actions = [],
    items = [],
  } = {}) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.dialog = dialog;
    this.actions = actions;
    this.items = items;
    this.__objectName = objectName;
    Object.freeze(this);
  }
}

const isCharacter = (object) => object.__objectName === 'CHARACTER';

export const assertCharacter = (character) => {
  if (!isCharacter(character)) {
    throw new Error('EXPECTED_CHARACTER_OBJECT');
  }
};

// getters

export const getName = (character) => {
  assertCharacter(character);
  return character.name;
};

export const getType = (character) => {
  assertCharacter(character);
  return character.type;
};

export const getHealth = (character) => {
  assertCharacter(character);
  return character.health;
};

export const getDialog = (character) => {
  assertCharacter(character);
  return character.dialog;
};

export const getActions = (character) => {
  assertCharacter(character);
  return character.actions;
};

export const getItems = (character) => {
  assertCharacter(character);
  return character.items;
};

// setters

export const setName = (character, newName) => {
  assertCharacter(character);
  return new Character({ ...character, name: newName });
};

export const setType = (character, newType) => {
  assertCharacter(character);
  return new Character({ ...character, type: newType });
};

export const setHealth = (character, newHealth) => {
  assertCharacter(character);
  return new Character({ ...character, health: newHealth });
};

export const setDialog = (character, newDialog) => {
  assertCharacter(character);
  return new Character({ ...character, dialog: newDialog });
};

export const setActions = (character, newActions) => {
  assertCharacter(character);
  return new Character({ ...character, actions: newActions });
};

export const setItems = (character, newItems) => {
  assertCharacter(character);
  return new Character({ ...character, items: newItems });
};
