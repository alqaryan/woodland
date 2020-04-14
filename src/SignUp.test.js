import renderer from 'react-test-renderer';
import React from 'react';

const SignUp = require('./SignUp.js');
describe('SignUp', function() {
    it('should be exist', function() {
      expect('SignUp').toBeDefined();
    });

    it('should be a function', function(){
      expect(typeof SignUp).toBe("function");
    })

    it('renders correctly', () => {
      const tree = renderer.create(<SignUp/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

  });