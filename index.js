/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './src/app/App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/app/store/store';

const ReduxConnector = () =>{

    return(
        <Provider store={store} >
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => ReduxConnector);
