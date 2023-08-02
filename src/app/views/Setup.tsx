import React from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import SetupIncome from '../components/forms/setup/SetupIncome';


const Setup = ({ navigation } : any) => {

  const onNavigate = (path: string) =>{
    navigation.replace("Home");
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <SetupIncome navigate={onNavigate} />
    </SafeAreaView>
  );
};

export default Setup;