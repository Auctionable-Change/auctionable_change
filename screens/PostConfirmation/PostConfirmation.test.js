import React from 'react'
import { render, fireEvent } from 'react-native-testing-library';
import PostConfirmation from './PostConfirmation';
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";


describe('PostConfirmation', () => {
  it('should render', () => {
    const tree = renderer.create(
      <StoreProvider>
        <PostConfirmation />
      </StoreProvider>).toJSON();
   expect(tree).toMatchSnapshot();
  })

})