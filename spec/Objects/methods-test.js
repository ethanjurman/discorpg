import { createUniqueId } from '../../game/Objects/methods';
describe('methods', () => {
  describe('#createUniqueId', () => {
    it('should not have conflicts within a 1,000,000 attempts', () => {
      const largeMap = {};
      let index = 0;
      while (index < 1000000) {
        largeMap[createUniqueId()] = 1;
        index++;
      }
      expect(Object.keys(largeMap).length).toBe(1000000);
    });
  });
});
