import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import ListingDetails from './ListingDetails';
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('ListingDetails', () => {
  it('should render', () => {
    const tree = renderer.create(
      <StoreProvider>
        <ListingDetails/>
      </StoreProvider>).toJSON();
   expect(tree).toMatchSnapshot();
  })
})