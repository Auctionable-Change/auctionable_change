import React from 'react';
import { render, fireEvent, waitFor, NativeTestEvent } from 'react-native-testing-library';
import Camera from './Camera';
import App from '../../App'
import { StoreProvider } from '../../store'
import {expect, it} from '@jest/globals';
import renderer from "react-test-renderer";
import { NavigationContainer } from '@react-navigation/native'
import { debug } from 'react-native-reanimated';


describe('Camera', () => {
 it('should render', () => {
    const tree = renderer.create(
          <App component={Camera}/>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  })

  // it('should display display a Continue Button on load', () => {
  //   const { getByText, getByA11yLabel, debug } = render(
  //     <StoreProvider>
  //        <App component={Camera}
  //          params={{title: 'test'}}
  //        />
  //     </StoreProvider>
  //   )
  //   debug()
  //   expect(getByText('test')).toBeTruthy()
  // })
})