import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DataEntry from './views/DataEntry';

const Stack = createNativeStackNavigator();

const MyStack = () =>{

    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
              name="DataEntry"
              component={DataEntry}
              options={{ title: 'Data Entry' }}
        /></Stack.Navigator>
    </NavigationContainer>
}