import renderer from 'react-test-renderer';
import React from 'react';

const SettingsScreen = require('./SettingsScreen.js');
describe('SettingsScreen', function() {
    it('should be exist', function() {
      expect('SettingsScreen').toBeDefined();
    });

    it('should be a function', function(){
      expect(typeof SettingsScreen).toBe("function");
    })

    it('renders correctly', () => {
      const tree = renderer.create(<SettingsScreen/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

  });