import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
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
  it('should navigate when all inputs are full', () => {
    const { getByText, getByA11yLabel } = render(
      <StoreProvider>
        <SellerForm />
      </StoreProvider>
    )
    const send = getByText('Continue')
    fireEvent(getByA11yLabel("item-name"), 'onChange', {nativeEvent: {text: 'Test Item'}})
    fireEvent(getByA11yLabel("description"), 'onChange', {nativeEvent: {text: 'Baby Doll'}})
    fireEvent(getByA11yLabel("bid"), 'onChange', {nativeEvent: {text: '50'}})
  
    // fireEvent(getByPlaceholder("Item Category"), 'onValueChange', {nativeEvent: {value: 'baby'}})


    fireEvent.press(send);
    const itemTitle = waitFor(() => getByText('Test Item'));
    expect(itemTitle).toBeTruthy();
    })
  })