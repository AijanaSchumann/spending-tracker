import React from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({ navigation } : any) =>{

    return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button title="Add Entry" onPress={()=>{ navigation.navigate("AddEntry")}} />
    </SafeAreaView>)
}

export default Home;