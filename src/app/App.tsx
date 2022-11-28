
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import databaseService from './services/dbService';
import { addAll } from './store/slices/entrySlice';
import DataEntry from './views/DataEntry';
import Home from './views/Home';
import Overview from './views/Overview';

const App = () => {

  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();

useEffect(()=>{
  
  databaseService.openDbConnection().then(async res => {
    databaseService.createBaseTables();
    const loadedEntried = await databaseService.loadEntries();
    dispatch(addAll(loadedEntried));

  }).catch(err => console.error(err));

}, []);
  
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddEntry" component={DataEntry} />
            <Stack.Screen name="Overview" component={Overview} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
};

export default App;