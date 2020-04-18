import {
  WEAPON_TYPE,
  getName,
  assertItem,
  getType,
  getStrMod,
  getDexMod,
  getIntMod,
  getActions,
  setName,
  setType,
  EQUIPMENT_TYPE,
  setStrMod,
  setDexMod,
  setIntMod,
  Item,
} from '../../game/Objects/Item';

describe('Item.js', () => {
  const actions = [];
  const testItem = new Item({
    name: 'Flame Sword',
    type: WEAPON_TYPE,
    strMod: 1.5,
    dexMod: 1.0,
    intMod: null,
    actions: actions,
  });

  it('should not let you set properties with object Mutation', () => {
    expect(() => {
      testItem.name = 'Bad New Name';
    }).toThrow();
    expect(getName(testItem)).toBe('Flame Sword');
  });

  describe('#assertItem', () => {
    it('should not throw error if item', () => {
      expect(() => assertItem(testItem)).not.toThrow();
    });
    it('should throw if not item', () => {
      expect(() => assertItem({})).toThrow();
    });
  });

  // GETTERS

  describe('#getName', () => {
    it('should get Name', () => {
      expect(getName(testItem)).toBe('Flame Sword');
    });
  });

  describe('#getType', () => {
    it('should get Type', () => {
      expect(getType(testItem)).toBe(WEAPON_TYPE);
    });
  });

  describe('#getStrMod', () => {
    it('should get str mod', () => {
      expect(getStrMod(testItem)).toBe(1.5);
    });
  });

  describe('#getDexMod', () => {
    it('should get dex mod', () => {
      expect(getDexMod(testItem)).toBe(1.0);
    });
  });

  describe('#getIntMod', () => {
    it('should get int mod (null should be 0)', () => {
      expect(getIntMod(testItem)).toBe(0);
    });
  });

  describe('#getActions', () => {
    it('should get Actions', () => {
      expect(getActions(testItem)).toBe(actions);
    });
  });

  // SETTERS

  describe('#setName', () => {
    it('should let you change name with method', () => {
      const newTestItem = setName(testItem, 'Frost Sword');
      expect(getName(newTestItem)).toBe('Frost Sword');
    });
  });

  describe('#setType', () => {
    it('should let you change type with method', () => {
      const newTestItem = setType(testItem, EQUIPMENT_TYPE);
      expect(getType(newTestItem)).toBe(EQUIPMENT_TYPE);
    });
  });

  describe('#setStrMod', () => {
    it('should let you change str mod with method', () => {
      const newTestItem = setStrMod(testItem, 1.3);
      expect(getStrMod(newTestItem)).toBe(1.3);
    });
  });

  describe('#setDexMod', () => {
    it('should let you change dex mod with method', () => {
      const newTestItem = setDexMod(testItem, 1.3);
      expect(getDexMod(newTestItem)).toBe(1.3);
    });
  });

  describe('#setIntMod', () => {
    it('should let you change int mod with method', () => {
      const newTestItem = setIntMod(testItem, 1.3);
      expect(getIntMod(newTestItem)).toBe(1.3);
    });
  });

  xdescribe('#setActions', () => {
    // NEED TO CREATE ACTIONS OBJECT
  });
});
