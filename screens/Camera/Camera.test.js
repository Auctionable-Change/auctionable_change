import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
import Camera from './Camera';
import App from '../../App'
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";



describe('Camera', () => {
 it('should render', () => {
    const tree = renderer.create(
          <App component={Camera}/>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('should display display a Continue Button on load', () => {
    const { getByText } = render(
      <StoreProvider>
        <App
          component={() => (
            <Camera
              cameraType="launchCameraAsync"
              user="seller"
              prompt="Press camera to take a photo of your item to donate!"
              title="Upload a Photo"
            />
          )}
        />
      </StoreProvider>
    );
    waitFor(() => expect(getByText("Continue")).toBeTruthy());
  })

  it('should display an alert if user clicks continue without uploading a photo', () => {
    const { getByText } = render(
      <StoreProvider>
        <App
          component={() => (
            <Camera
              cameraType="launchCameraAsync"
              user="seller"
              prompt="Press camera to take a photo of your item to donate!"
              title="Upload a Photo"
            />
          )}
        />
      </StoreProvider>
    );
    waitFor(() => fireEvent.press(getByText("Continue"))) 
    waitFor(() => expect(getByText("Photo Required", "You must upload photo to continue")).toBeTruthy());
  })
})