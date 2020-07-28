import React from 'react';
import { render, waitFor } from 'react-native-testing-library';
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
  it('should display title and payment instructions', () => {
    const state = {
      currentListing: {
        price: 3,
        id: 4,
        charity_url: "www.photo.com"
      },
    };
    const { getByText } = render(
      <StoreProvider>
        <App
          component={({ navigation }) => (
            <PaymentInstructions
              mockStore={state}
              navigation={navigation}
              component={({ navigation }) => (
                <Camera
                  cameraType="launchCameraAsync"
                  user="seller"
                  prompt="Press camera to take a photo of your item to donate!"
                  title="Upload a Photo"
                  navigation={navigation}
                />
              )}
            />
          )}
        />
      </StoreProvider>
    );
    waitFor(() =>
      expect(getByText("Thank you for your contribution!")).toBeTruthy()
      );
    waitFor(() =>
      expect(getByText("Instructions to complete order")).toBeTruthy()
    );
    waitFor(() =>
      expect(getByText("First, follow this link to donate at least $3.")).toBeTruthy()
    );
  })
  it('should display a receipt photo', () => {
    const state = {
      currentListing: {
        price: 3,
        id: 4,
        charity_url: "www.photo.com"
      },
    };
    const { getByText, getByRole } = render(
      <StoreProvider>
        <App
          component={({ navigation }) => (
            <PaymentInstructions
              mockStore={state}
              navigation={navigation}
              component={({ navigation }) => (
                <Camera
                  cameraType="launchCameraAsync"
                  user="seller"
                  prompt="Press camera to take a photo of your item to donate!"
                  title="Upload a Photo"
                  navigation={navigation}
                />
              )}
            />
          )}
        />
      </StoreProvider>
    );
    waitFor(() =>
      expect(getByText("Upload Receipt")).toBeTruthy()
      );
    waitFor(() =>
      expect(getByText("Press camera to upload screenshot of donation receipt")).toBeTruthy()
    );
    waitFor(() =>
      expect(getByRole("Image")).toBeTruthy()
    );
  })
})