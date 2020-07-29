import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import BuyerForm from './BuyerForm';
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";
import { waitFor} from 'react-native-testing-library';



describe('BuyerForm', () => {
  it('should render', () => {
    const tree = renderer.create(
      <StoreProvider>
        <BuyerForm />
      </StoreProvider>).toJSON();
   expect(tree).toMatchSnapshot();
  })

  it('should send an Email', () => {
    const mockSendEmail = jest.fn();
    const state = {
      currentListing: {
        price: 3,
        id: 4
      },
      buyerDetails: {
        receipt: 'www.image.com'
      }
    }
    const buyerObj = {
      bidder_name: 'User1',
      bidder_email: 'User1@gmail.com',
      street_address: '123 main st',
      city: 'Denver',
      state: 'CO',
      zip_code: '80238',
      amount: 3,
      item_id: 4,
      receipt: 'www.image.com'
    }
    
    const { getByText, getByA11yLabel } = render(
      <StoreProvider >
        <BuyerForm mockStore={state} sendEmail={mockSendEmail}/>
      </StoreProvider>
    )
    const send = getByText('Complete Purchase')
    fireEvent(getByA11yLabel("name"), 'onChange', {nativeEvent: {text: 'User1'}})
    fireEvent(getByA11yLabel("email"), 'onChange', {nativeEvent: {text: 'User1@gmail.com'}})
    fireEvent(getByA11yLabel("address"), 'onChange', {nativeEvent: {text: '123 main st'}})
    fireEvent(getByA11yLabel("city"), 'onChange', {nativeEvent: {text: 'Denver'}})
    fireEvent(getByA11yLabel("state"), 'onChange', {nativeEvent: {text: 'CO'}})
    fireEvent(getByA11yLabel("zip"), 'onChange', {nativeEvent: {text: '80238'}})
    

    fireEvent.press(send)
    expect(mockSendEmail).not.toHaveBeenCalledWith(buyerObj)
    waitFor(() =>
      expect(getByText("Missing, Input", "Please fill out all fields to continue")).toBeTruthy()
    );
  })
})