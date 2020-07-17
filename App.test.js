import App from './App'
import React from "react";
import renderer from "react-test-renderer";

describe('App', () => {
  it('should render', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  })
  
})