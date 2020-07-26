import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import SellerForm from './SellerForm';
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";
import { debug } from 'react-native-reanimated';


describe('SellerForm', () => {
  it('should render', () => {
    const tree = renderer.create(
      <StoreProvider>
        <SellerForm />
      </StoreProvider>).toJSON();
   expect(tree).toMatchSnapshot();
  })

})