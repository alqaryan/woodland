const SettingsScreen = require('./SettingsScreen.js');
describe('SettingsScreen', function() {
    it('should be exist', function() {
      expect('SettingsScreen').toBeDefined();
    });

    it('should be a function', function(){
      expect(typeof SettingsScreen).toBe("function");
    })
  });