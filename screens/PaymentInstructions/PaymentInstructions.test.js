import React from 'react';
import { render, fireEvent, waitFor, NativeTestEvent } from 'react-native-testing-library';
import PaymentInstructions from './PaymentInstructions';
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";
import App from '../../App'


describe('PaymentInstructions', () => {
  it('should render', () => {
    const tree = renderer.create(
          <App component={PaymentInstructions}/>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})