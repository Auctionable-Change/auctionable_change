import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import BuyerForm from './BuyerForm';
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";


describe('BuyerForm', () => {
  it('should render', () => {
    const tree = renderer.create(
      <StoreProvider>
        <BuyerForm />
      </StoreProvider>).toJSON();
   expect(tree).toMatchSnapshot();
  })
})