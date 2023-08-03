import React from 'react';
import { View } from 'react-native';
import SettingsList from '../components/settings/SettingsList';

const Settings = () => {

    //color / type charts
    //dark / light theme
    //start of month
    //currency
    //move categories into settings?
    //change expense / income adding -> close on save.


    return (
    <View style={{padding:10}}>
        <SettingsList />
    </View>
    )
}

export default Settings;