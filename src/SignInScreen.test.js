const SignInScreen = require('./SignInScreen.js');
describe('SignInScreen', function() {
    it('should be exist', function() {
      expect('SignInScreen').toBeDefined();
    });

    it('should be a function', function(){
      expect(typeof SignInScreen).toBe("function");
    })
  });