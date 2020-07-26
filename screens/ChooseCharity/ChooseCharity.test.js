import React from 'react';
import { render, fireEvent, waitFor, NativeTestEvent } from 'react-native-testing-library';
import ChooseCharity from './ChooseCharity';
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";
import { fetchCharities } from '../apiCalls';

jest.mock('../apiCalls')

describe('ChooseCharity', () => {
 it('should render', () => {
  const tree = renderer.create(
    <StoreProvider>
      <ChooseCharity/>
    </StoreProvider>).toJSON();
  expect(tree).toMatchSnapshot();
 })
 it('should display a message before searching for a charity', () => {
   const { getByText } = render(
    <StoreProvider>
      <ChooseCharity/>
    </StoreProvider>)

    const message = getByText('Search For Your Favorite Charity Above')
    const button = getByText('Browse Our Featured Charities')
    expect(message).toBeTruthy()
    expect(button).toBeTruthy()
 })
 it('should search the BE charity API', () => {
    fetchCharities.mockResolvedValue(
      {
        "id": 200345249,
        "url": "https://www.charitynavigator.org/?bay=search.summary&orgid=14066&utm_source=DataAPI&utm_content=6bc9f3c8",
        "name": "Charity1",
        "rating": 4
      },
    )
    const { getByText, getByPlaceholder } = render(
      <StoreProvider>
        <ChooseCharity />
      </StoreProvider>)

      const searchBtn = getByText('Go!');
      fireEvent.press(searchBtn);
      const charityItem = waitFor(() => getByText('Charity1'));
      expect(charityItem).toBeTruthy();
  
    })
   
})
