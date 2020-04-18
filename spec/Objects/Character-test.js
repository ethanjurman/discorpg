import {
  Character,
  assertCharacter,
  PLAYER_TYPE,
  getName,
  getType,
  getActions,
  getItems,
  getMaxHP,
  setName,
  setType,
  setMaxHP,
  NPC_TYPE,
  getCurrentHP,
  setCurrentHP,
  getStr,
  getInt,
  getDex,
  setStr,
  setInt,
  setDex,
} from '../../game/Objects/Character';

describe('Character.js', () => {
  const actions = [];
  const items = [];
  const testCharacter = new Character({
    name: 'DERK',
    type: PLAYER_TYPE,
    maxHP: 150,
    currentHP: 50,
    str: 1.5,
    dex: 1.1,
    int: 0.6,
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

  describe('#getMaxHP', () => {
    it('should get max HP', () => {
      expect(getMaxHP(testCharacter)).toBe(150);
    });
  });

  describe('#getCurrentHP', () => {
    it('should get current HP', () => {
      expect(getCurrentHP(testCharacter)).toBe(50);
    });
  });

  describe('#getStr', () => {
    it('should get str', () => {
      expect(getStr(testCharacter)).toBe(1.5);
    });
  });

  describe('#getDex', () => {
    it('should get dex', () => {
      expect(getDex(testCharacter)).toBe(1.1);
    });
  });

  describe('#getInt', () => {
    it('should get int', () => {
      expect(getInt(testCharacter)).toBe(0.6);
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

  describe('#setMaxHP', () => {
    it('should let you change name with method', () => {
      const newTestCharacter = setMaxHP(testCharacter, 40);
      expect(getMaxHP(newTestCharacter)).toBe(40);
    });
  });

  describe('#setCurrentHP', () => {
    it('should let you change name with method', () => {
      const newTestCharacter = setCurrentHP(testCharacter, 40);
      expect(getCurrentHP(newTestCharacter)).toBe(40);
    });
  });

  describe('#setStr', () => {
    it('should let you change name with method', () => {
      const newTestCharacter = setStr(testCharacter, 1.3);
      expect(getStr(newTestCharacter)).toBe(1.3);
    });
  });

  describe('#setDex', () => {
    it('should let you change name with method', () => {
      const newTestCharacter = setDex(testCharacter, 1.3);
      expect(getDex(newTestCharacter)).toBe(1.3);
    });
  });

  describe('#setInt', () => {
    it('should let you change name with method', () => {
      const newTestCharacter = setInt(testCharacter, 1.3);
      expect(getInt(newTestCharacter)).toBe(1.3);
    });
  });

  xdescribe('#setActions', () => {
    // NEED TO CREATE ACTIONS OBJECT
  });

  xdescribe('#setItems', () => {
    // NEED TO CREATE ITEMS OBJECT
  });
});
