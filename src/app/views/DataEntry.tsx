import { Picker } from '@react-native-picker/picker';
import { PrivateValueStore } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { Button, Switch, Text, TextInput } from 'react-native';
import { Screen } from 'react-native-screens';
import { useDispatch, useSelector } from 'react-redux';
import { Entry } from '../models/entry';
import databaseService from '../services/dbService';
import { add } from '../store/slices/entrySlice';
import { RootState } from '../store/store';


const DataEntry: FC = () => {

  const [input, setInput] = useState("");
  const [categoryId, setCategory] = useState<number>();
  const [note, setNote] = useState("");
  const [isRecurring, setRecurring] = useState(false);
  const [interval, setInterval] = useState("monthly");
  const [error, showError] = useState(false);

  const categories = useSelector((state: RootState) => state.categories.categories);

  const dispatch = useDispatch();

  const reset = () => {
    setInput("");
    setNote("");
    setRecurring(false);
    setCategory(undefined);
  }

  const saveEntry = () => {

    if (input.length === 0 || !categoryId) {
      showError(true);
    } else {

      showError(false);
      const newEntry: Entry = {
        note: note,
        value: Number(input),
        date: new Date().toISOString(),
        categoryId: categoryId,
        recurring: isRecurring,
        interval: isRecurring ? interval : undefined
      };
     
      databaseService.saveEntry(newEntry).then(newId =>{
        newEntry.id = newId;
        dispatch(add(newEntry));
        reset();
      });
      
    }
  }

  return (
    <Screen>
      <TextInput placeholder='value spend' value={input} onChangeText={setInput} keyboardType="numeric"></TextInput>
      {
        error && input.length === 0 &&
        <Text>Cannot be empty</Text>
      }
      <Text>Select category</Text>
      <Picker selectedValue={categoryId} onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
      <Picker.Item label="" value={undefined} />
        {     
          categories.map(category => {
            return <Picker.Item label={category.title} value={category.id} />
            }
          )
        }
      </Picker>
      {
        error && !categoryId &&
        <Text>Category must be selected</Text>
      }

      <Text>Reaccuring?</Text>
      <Switch value={isRecurring} onValueChange={setRecurring} />
      {
        isRecurring &&
        <Picker selectedValue={interval} onValueChange={(itemValue, itemIndex) => setInterval(itemValue)}>
          <Picker.Item label="weekly" value={"weekly"} />
          <Picker.Item label="monthly" value={"monthly"} />
          <Picker.Item label="quarterly" value={"quarterly"} />
          <Picker.Item label="yearly" value={"yearly"} />
        </Picker>
      }

      <TextInput placeholder='add a note' multiline value={note} onChangeText={setNote} />
      <Button title='Save' onPress={saveEntry} />
    </Screen>)
}

export default DataEntry;