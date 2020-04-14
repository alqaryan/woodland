import renderer from 'react-test-renderer';
import React from 'react';

const CollectionScreen = require('./CollectionScreen.js');
describe('CollectionScreen', function() {
    it('should be exist', function() {
      expect('CollectionScreen').toBeDefined();
    });

    it('should be a function', function(){
      expect(typeof CollectionScreen).toBe("function");
    })

    it('renders correctly', () => {
      const tree = renderer.create(<CollectionScreen/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });