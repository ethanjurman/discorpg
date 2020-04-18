import {
  BATTLE,
  SHOP,
  getName,
  getType,
  getDescription,
  getEmoji,
  getOnAction,
  setName,
  setType,
  setDescription,
  setEmoji,
  setOnAction,
  Action,
  assertAction,
} from '../../game/Objects/Action';

describe('Action.js', () => {
  const testAction = new Action({
    name: 'Swing',
    type: BATTLE,
    description: 'Swing your weapon with terrifying strength',
    emoji: '⚔',
    onAction: null,
  });

  it('should not let you set properties with object mutation', () => {
    expect(() => {
      testAction.name = 'Swong';
    }).toThrow();
    expect(getName(testAction)).toBe('Swing');
  });

  describe('#assertAction', () => {
    it('should not throw error if action', () => {
      expect(() => assertAction(testAction)).not.toThrow();
    });
    it('should throw if not action', () => {
      expect(() => assertAction(null)).toThrow();
    });
  });

  describe('#getName', () => {
    it('should get Name', () => {
      expect(getName(testAction)).toBe('Swing');
    });
  });

  describe('#getType', () => {
    it('should get Type', () => {
      expect(getType(testAction)).toBe(BATTLE);
    });
  });

  describe('#getDescription', () => {
    it('should get Description', () => {
      expect(getDescription(testAction)).toBe(
        'Swing your weapon with terrifying strength'
      );
    });
  });
  describe('#getEmoji', () => {
    it('should get Emoji', () => {
      expect(getEmoji(testAction)).toBe('⚔');
    });
  });

  describe('#getOnAction', () => {
    it('should get onAction', () => {
      expect(getOnAction(testAction)).toEqual(null);
    });
  });

  describe('#setName', () => {
    it('should let you change Name', () => {
      const newTestAction = setName(testAction, 'Punch');
      expect(getName(newTestAction)).toBe('Punch');
    });
  });

  describe('#setType', () => {
    it('should let you change Type', () => {
      const newTestAction = setType(testAction, SHOP);
      expect(getType(newTestAction)).toBe(SHOP);
    });
  });

  describe('#setDescription', () => {
    it('should let you change Description', () => {
      const newTestAction = setDescription(testAction, 'punch with fist');
      expect(getDescription(newTestAction)).toBe('punch with fist');
    });
  });

  describe('#setEmoji', () => {
    it('should let you change Emoji', () => {
      const newTestAction = setEmoji(testAction, '');
      expect(getEmoji(newTestAction)).toBe('');
    });
  });

  describe('#setOnAction', () => {
    it('should let you change OnAction', () => {
      const newTestAction = setOnAction(testAction, null);
      expect(getOnAction(newTestAction)).toEqual(null);
    });
  });
});
