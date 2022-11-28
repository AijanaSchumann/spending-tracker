import React from 'react';
import { Button, Text, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectMonthlySpend } from '../store/selectors';


const Home = ({ navigation } : any) =>{

  const monthlySpend = useSelector(selectMonthlySpend);
  
    return (
    <SafeAreaView>
      <TouchableHighlight onPress={() => {navigation.navigate("Overview")}}>
        <>
        <Text>{monthlySpend}</Text>
        <Text>spent this month. Tap for more details.</Text>
        </>
      </TouchableHighlight>
      <Button title="Add Entry" onPress={()=>{ navigation.navigate("AddEntry")}} />
    </SafeAreaView>)
}

export default Home;