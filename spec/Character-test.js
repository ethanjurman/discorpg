import {
  Character,
  assertCharacter,
  PLAYER_TYPE,
  getName,
  getType,
  getDialog,
  getActions,
  getItems,
  getHealth,
  setName,
  setType,
  setHealth,
  NPC_TYPE,
} from '../game/Objects/Character';

describe('Character.js', () => {
  const dialog = [];
  const actions = [];
  const items = [];
  const testCharacter = new Character({
    name: 'DERK',
    type: PLAYER_TYPE,
    health: 150,
    dialog: dialog,
    actions: actions,
    items: items,
  });

  it('should not let you set properties with object Mutation', () => {
    expect(() => {
      testCharacter.name = 'Bad New Name';
    }).toThrow();
    expect(getName(testCharacter)).toBe('DERK');
  });

  describe('#assertCharacter', () => {
    it('should not throw error if character', () => {
      expect(() => assertCharacter(testCharacter)).not.toThrow();
    });
    it('should throw if not character', () => {
      expect(() => assertCharacter({})).toThrow();
    });
  });

  // GETTERS

  describe('#getName', () => {
    it('should get Name', () => {
      expect(getName(testCharacter)).toBe('DERK');
    });
  });

  describe('#getType', () => {
    it('should get Type', () => {
      expect(getType(testCharacter)).toBe(PLAYER_TYPE);
    });
  });

  describe('#getHealth', () => {
    it('should get Health', () => {
      expect(getHealth(testCharacter)).toBe(150);
    });
  });

  describe('#getDialog', () => {
    it('should get Dialog', () => {
      expect(getDialog(testCharacter)).toBe(dialog);
    });
  });

  describe('#getActions', () => {
    it('should get Actions', () => {
      expect(getActions(testCharacter)).toBe(actions);
    });
  });

  describe('#getItems', () => {
    it('should get Items', () => {
      expect(getItems(testCharacter)).toBe(items);
    });
  });

  // SETTERS

  describe('#setName', () => {
    it('should let you change name with method', () => {
      const newTestCharacter = setName(testCharacter, 'DORK');
      expect(getName(newTestCharacter)).toBe('DORK');
    });
  });

  describe('#setType', () => {
    it('should let you change name with method', () => {
      const newTestCharacter = setType(testCharacter, NPC_TYPE);
      expect(getType(newTestCharacter)).toBe(NPC_TYPE);
    });
  });

  describe('#setHealth', () => {
    it('should let you change name with method', () => {
      const newTestCharacter = setHealth(testCharacter, 40);
      expect(getHealth(newTestCharacter)).toBe(40);
    });
  });

  xdescribe('#setDialog', () => {
    // NEED TO CREATE DIALOG OBJECT
  });

  xdescribe('#setActions', () => {
    // NEED TO CREATE ACTIONS OBJECT
  });

  xdescribe('#setItems', () => {
    // NEED TO CREATE ITEMS OBJECT
  });
});
