import React from 'react';
import Welcome from './Welcome';
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";


describe('Welcome', () => {
  it('should render', () => {
    const tree = renderer.create(
      <StoreProvider>
        <Welcome />
      </StoreProvider>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})