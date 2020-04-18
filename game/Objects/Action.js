export const BATTLE = 'BATTLE';
export const SHOP = 'SHOP';

export class Action {
  constructor({
    type = '',
    name = '',
    description = '',
    emoji = '',
    onAction = null,
  } = {}) {
    this.type = type;
    this.name = name;
    this.description = description;
    this.emoji = emoji;
    this.onAction = onAction;
    this.__objectName = 'ACTION';
    Object.freeze(this);
  }
}

const isAction = (object) => object.__objectName === 'ACTION';

export const assertAction = (action) => {
  if (!isAction(action)) {
    throw new Error('EXPECTED_ACTION_OBJECT');
  }
};

export const getType = (action) => {
  assertAction(action);
  return action.type;
};

export const getName = (action) => {
  assertAction(action);
  return action.name;
};

export const getDescription = (action) => {
  assertAction(action);
  return action.description;
};

export const getEmoji = (action) => {
  assertAction(action);
  return action.emoji;
};

export const getOnAction = (action) => {
  assertAction(action);
  return action.onAction;
};

export const setType = (action, newType) => {
  assertAction(action);
  return new Action({ ...action, type: newType });
};

export const setName = (action, newName) => {
  assertAction(action);
  return new Action({ ...action, name: newName });
};

export const setDescription = (action, newDescription) => {
  assertAction(action);
  return new Action({ ...action, description: newDescription });
};

export const setEmoji = (action, newEmoji) => {
  assertAction(action);
  return new Action({ ...action, emoji: newEmoji });
};

export const setOnAction = (action, newOnAction) => {
  assertAction(action);
  return new Action({ ...action, onAction: newOnAction });
};
