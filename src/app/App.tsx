
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { store } from './store/store';
import DataEntry from './views/DataEntry';
import Home from './views/Home';
import Overview from './views/Overview';

const App = () => {
 
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store} >
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddEntry" component={DataEntry} />
        <Stack.Screen name="Overview" component={Overview} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    </Provider>
  );
};

export default App;
