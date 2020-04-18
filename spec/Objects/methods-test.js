import {
  createUniqueId,
  getId,
  getObject,
  setObjectToId,
} from '../../game/Objects/methods';
import { Character } from '../../game/Objects/Character';
describe('methods', () => {
  describe('#createUniqueId', () => {
    it('should not have conflicts within a 100,000 attempts', () => {
      // I tested this multiple times with over 1,000,000. but it slows down
      // testing enough so I'm just gonna do 100,000.
      const largeMap = {};
      let index = 0;
      while (index < 100000) {
        largeMap[createUniqueId()] = 1;
        index++;
      }
      expect(Object.keys(largeMap).length).toBe(100000);
    });
  });

  describe('#getId', () => {
    const testChar = new Character();
    it('should get id from object', () => {
      expect(getId(testChar)).toBe(testChar.id);
    });
  });

  describe('#getObject', () => {
    it('should get character from id', () => {
      const testChar = new Character();
      expect(getObject(getId(testChar))).toBe(testChar);
    });
  });

  describe('#setObjectToId', () => {
    it('should allow new objects to id', () => {
      setObjectToId('test_message', 'Hello World!');
      expect(getObject('test_message')).toBe('Hello World!');
    });
  });
});
