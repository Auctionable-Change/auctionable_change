import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import BuyerForm from './BuyerForm';
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";


describe('BuyerForm', () => {
  it('should render', () => {
    const state = {
      currentListing: {
        price: 3,
        id: 4
      }
    }
    const tree = renderer.create(
      <StoreProvider>
        <BuyerForm state={state}/>
      </StoreProvider>).toJSON();
   expect(tree).toMatchSnapshot();
  })
})