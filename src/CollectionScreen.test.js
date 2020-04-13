const CollectionScreen = require('./CollectionScreen.js');
describe('CollectionScreen', function() {
    it('should be exist', function() {
      expect('CollectionScreen').toBeDefined();
    });

    it('should be a function', function(){
      expect(typeof CollectionScreen).toBe("function");
    })
  });