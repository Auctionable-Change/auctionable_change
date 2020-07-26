import React from 'react';
import { render, fireEvent, waitFor, NativeTestEvent } from 'react-native-testing-library';
import EmailForm from './EmailForm';
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";


describe('EmailForm', () => {
  it('should render', () => {
    const tree = renderer.create(
      <StoreProvider>
        <EmailForm />
      </StoreProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('should display passed in information', () => {
    const { getByText } = render(
      <StoreProvider>
        <EmailForm />
      </StoreProvider>
    )
    const message = getByText("Please enter your contact and shipping information to send an email to the seller.")
    expect(message).toBeTruthy()
  })
})