import App from './App'
import React from "react";
import renderer from "react-test-renderer";
import { waitFor} from 'react-native-testing-library';


describe('App', () => {
  it('should render', () => {
    const tree = waitFor(() => renderer.create(<App />).toJSON());
     waitFor(() => expect(tree.children.length).toBe(1));
  })
  
})