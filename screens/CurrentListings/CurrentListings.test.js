import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import CurrentListings from './CurrentListings';
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";

describe('CurrentListings', () => {
  it('should render', () => {
    const tree = renderer.create(
      <StoreProvider>
        <CurrentListings/>
      </StoreProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  })
})