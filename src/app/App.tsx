
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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear, faHome, faList } from '@fortawesome/free-solid-svg-icons';


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
    <Tab.Screen  name="Home_Tab" component={Home} options={{title:"Home", tabBarIcon:({ color, size }) => (<FontAwesomeIcon color={color} size={size} icon={faHome} />)}}  />
    <Tab.Screen name="Spendings" component={Overview} options={{tabBarIcon:({ color, size }) => (<FontAwesomeIcon color={color} size={size} icon={faList} />)}}  />
    <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon:({ color, size }) => (<FontAwesomeIcon color={color} size={size} icon={faGear} />)}} />
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