/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './src/app/App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { setupStore } from './src/app/store/store';

const ReduxConnector = () =>{

    return(
        <Provider store={setupStore()} >
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => ReduxConnector);
