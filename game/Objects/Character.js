export const PLAYER_TYPE = 'PLAYER_TYPE';
export const NPC_TYPE = 'NPC_TYPE';
export const ENEMY_TYPE = 'ENEMY_TYPE';
export const UNDEFINED = 'UNDEFINED';

/*
Character stats

name: The characters name

type: The type of character
  - PLAYER_TYPE - 
  is controlled by a user.
  - NPC_TYPE -
  non-playable-character is manipulated by the engine of the game.
  - ENEMY_TYPE -
  non-playable-character that is actively attacking players
  - UNDEFINED -
  NULL

maxHP: The characters Total HP

currentHP: The characters current HP

str: The characters strength.
  - Contributes to Max HP, Weapon Damage Multiplier

dex: The characters dexterity.
  - Contributes to Dodge Chance, Crit Chance

int: The characters intelligence.
  - Contributes to Item Effectiveness, Alternate Damage Multiplier

actions: The characters actions. When the character is queued up, they can
  select from a number of actions depending on the scene. For instance, in
  BATTLE_SCENE scecnes, any action that has type BATTLE_SCENE will display.
  If more the character is player controlled, options for which action is 
  displayed. Otherwise one will get choosen at random.

items: The characters items. 

 */
export class Character {
  constructor({
    name = UNDEFINED,
    type = UNDEFINED,
    maxHP = 100,
    currentHP = 100,
    str = 1,
    dex = 1,
    int = 1,
    actions = [],
    items = [],
  } = {}) {
    this.name = name;
    this.type = type;
    this.maxHP = maxHP;
    this.currentHP = currentHP;
    this.str = str;
    this.dex = dex;
    this.int = int;
    this.actions = actions;
    this.items = items;
    this.__objectName = 'CHARACTER';
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

export const getMaxHP = (character) => {
  assertCharacter(character);
  return character.maxHP;
};

export const getCurrentHP = (character) => {
  assertCharacter(character);
  return character.currentHP;
};

export const getStr = (character) => {
  assertCharacter(character);
  return character.str;
};

export const getDex = (character) => {
  assertCharacter(character);
  return character.dex;
};

export const getInt = (character) => {
  assertCharacter(character);
  return character.int;
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

export const setMaxHP = (character, newMaxHP) => {
  assertCharacter(character);
  return new Character({ ...character, maxHP: newMaxHP });
};

export const setCurrentHP = (character, newCurrentHP) => {
  assertCharacter(character);
  return new Character({ ...character, currentHP: newCurrentHP });
};

export const setStr = (character, newStr) => {
  assertCharacter(character);
  return new Character({ ...character, str: newStr });
};

export const setDex = (character, newDex) => {
  assertCharacter(character);
  return new Character({ ...character, dex: newDex });
};

export const setInt = (character, newInt) => {
  assertCharacter(character);
  return new Character({ ...character, int: newInt });
};

export const setActions = (character, newActions) => {
  assertCharacter(character);
  return new Character({ ...character, actions: newActions });
};

export const setItems = (character, newItems) => {
  assertCharacter(character);
  return new Character({ ...character, items: newItems });
};
