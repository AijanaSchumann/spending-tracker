
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import databaseService from './services/dbService';
import Home from './views/Home';
import Overview from './views/Overview';
import defaultDataService from './services/defaultDataService';
import Setup from './views/Setup';
import { Text } from 'react-native';
import Settings from './views/Settings';
import { Dispatcher } from './store/store';
import { createInitialCategories, loadDataOnStartup } from './store/actions/SetupAction';


const App = () => {

  const dispatch = useDispatch<Dispatcher>();
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const [initialScreen, setInitialScreen] = useState<null | "Home" | "Setup">(null)

useEffect(()=>{

  databaseService.openDbConnection().then(async res => {
    await databaseService.createBaseTables();
    
    defaultDataService.isAppFirstLaunched().then(async (firstRun)=>{
      if(firstRun){
          await dispatch(createInitialCategories());
          setInitialScreen("Setup");
      }else{
        await dispatch(loadDataOnStartup());
        setInitialScreen("Home");
      }
    });

  }).catch(err => console.error(err));

}, []);

const MainTabs = () =>{

  return <Tab.Navigator>
    <Tab.Screen name="Home_Tab" options={{title:"Home"}} component={Home} />
    <Tab.Screen name="Spendings" component={Overview} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
}
  
  return (
      <SafeAreaProvider>
{
initialScreen !== null ?
<NavigationContainer>
<Stack.Navigator initialRouteName={initialScreen}>
  <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />
  <Stack.Screen name="Setup" component={Setup} />
</Stack.Navigator>
</NavigationContainer>
:
<Text>App loading...</Text>

}
      </SafeAreaProvider>
  );
};

export default App;