import React, { FC, useState } from 'react';
import { Button, Text, TextInput } from 'react-native';
import { Screen } from 'react-native-screens';
import { useDispatch, useSelector } from 'react-redux';
import { Entry } from '../models/entry';
import { add } from '../store/slices/entrySlice';
import { RootState } from '../store/store';


const DataEntry : FC = () => {

    const [input, setInput] = useState("");
    const [category, setCategory] = useState("");
    const [note, setNote] = useState("");

    const categories = useSelector((state: RootState) => state.categories.categories);
    const entries = useSelector((state: RootState) => state.entries.entries);

    const dispatch = useDispatch();

    const saveEntry = () =>{

        //check if value and category are set

        const newEntry : Entry = {
           note: note,
           value: Number(input),
           date: new Date().toUTCString(),
           categoryId:1
        };

        dispatch(add(newEntry));

    }

    //TODO: get available categories from store
     //get picker for category
    //get picker for date/time (community packages?)
    return (
    <Screen>
      <Text>Data entry test</Text>
      <TextInput value={input} onChangeText={setInput} keyboardType="numeric"></TextInput>
      <TextInput value={note} onChangeText={setNote} />
      <Button title='Save' onPress={saveEntry} />
    </Screen>)
}

export default DataEntry;