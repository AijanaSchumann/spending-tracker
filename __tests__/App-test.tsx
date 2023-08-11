/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/app/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from '../src/app/store/store';

it('renders correctly', () => {
  
  renderer.create(
  <Provider store={store} >
    <App />
  </Provider>);
});
