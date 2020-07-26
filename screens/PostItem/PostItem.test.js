import React from 'react';
import PostItem from './PostItem';
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";


describe('PostItem', () => {
  it('should render', () => {
    const tree = renderer.create(
      <StoreProvider>
        <PostItem />
      </StoreProvider>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})