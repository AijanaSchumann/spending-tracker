import React, { useState } from 'react';
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import defaultDataService from '../../../services/defaultDataService';
import CustomPicker from '../../../components/general/picker/CustomPicker';
import {Picker} from '@react-native-picker/picker';
import {faAdd} from '@fortawesome/free-solid-svg-icons/faAdd';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AddFurtherIncome from './AddFurtherIncome';
import { useDispatch, useSelector } from 'react-redux';
import { saveAllIncome } from '../../../store/slices/incomeSlice';
import { Entry } from '../../../models/entry';
import { Dispatcher, RootState } from '../../../store/store';
import MoneyTextInput from '../../../components/general/MoneyTextInput';
import { intervalList } from '../../../constants/intervalList';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {paddingLeft: 20, paddingRight: 20, marginBottom: 35},
  element: {marginBottom: 10},
  title:{fontSize: 20, fontWeight: "bold", textAlign:"center", marginBottom: 10},
  label: {marginTop: 20, fontSize: 15},
  textInput: {
    flex: 0,
    fontSize: 20,
    marginTop: 5,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
});

type Props = {
  navigate(route: string):void // passed in because the useNavigation hook is currently buggy
}

const SetupIncome = (props: Props) => {

  type furtherIncomeType = {
    note: string;
    value: number;
    key: number;
    interval: string | null;
    reaccuring: boolean;
    type: "income" 
  };

  const dispatch = useDispatch<Dispatcher>();
  const categories = useSelector((state: RootState)=> state.income.categories);

  const [income, setIncome] = React.useState<string>("");
  const [interval, setInterval] = React.useState('monthly');
  const [furtherIncome, addFurtherIncome] = React.useState<furtherIncomeType[]>([]);
  const [category, setCategory] = useState("Salary");
  const [error, setError] = React.useState(false);

  const updateFurtherIncome = (id: number, newData: any, attribute: string) => {
    addFurtherIncome(
      furtherIncome.map(income => {
        return income.key === id ? {...income, [attribute]: newData} : income;
      }),
    );
  };

  const removeFurtherIncome = (id: number) => {
    const result = furtherIncome.filter(el => el.key !== id);
    addFurtherIncome(result);
  };

  const onSave = () => {

    const categoryId = categories.find(el=>el.title===category)?.id;
    const giftId = categories.find(el=> el.title=="Gift");
    
    if(!categoryId || income.length==0){
      setError(true);
    }else{

      setError(false);
      const incomeArray: Entry[] = [
        {value: Number(income), interval: interval, date: new Date().getTime(), categoryId: categoryId, type: "income", note: ""},
        ...furtherIncome.map<Entry>(res => {
          return {
            type: "income",
            value: res.value,
            interval: res.reaccuring ? res.interval : null,
            note: res.note,
            date: new Date().getTime(),
            categoryId: giftId!.id,
          };
        }),
      ];

    dispatch(saveAllIncome(incomeArray));
    defaultDataService.saveAppSetupDone();
    props.navigate('Home');
    }
  };

  const onSkip = () =>{
    defaultDataService.saveAppSetupDone();
    props.navigate('Home');
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Add first income</Text>
          <MoneyTextInput error={error} value={income} onChangeText={setIncome} />
          <Text style={styles.label}>Category</Text>
          <CustomPicker
            selectedValue={category}
            value={category}
            onValueChange={(ev: any) => setCategory(ev)}
            >
            {
              categories.map((el, i)=> <Picker.Item key={i} label={el.title} value={el.title} />)
            }

          </CustomPicker>
          <Text style={styles.label}>Interval</Text>
          <CustomPicker
            value={interval}
            selectedValue={interval}
            onValueChange={(ev: any) => setInterval(ev)}>
            {intervalList.map(el => (
              <Picker.Item label={el.value} value={el.value} key={el.value} />
            ))}
          </CustomPicker>
        </View>
        {
          furtherIncome.length == 0 && 
           <Text style={[styles.label, {marginBottom: 5}]}>Add further income sources?</Text>
        }
        {furtherIncome.map((el, i) => (
          <AddFurtherIncome
            key={i}
            data={el}
            updateFurtherIncome={updateFurtherIncome}
            removeFurtherIncome={removeFurtherIncome}
          />
        ))}

        <Pressable
          style={{alignItems: 'center', padding: 5}}
          onPress={ev =>
            addFurtherIncome([
              ...furtherIncome,
              {
                note: '',
                value: 0,
                key: furtherIncome.length + 1,
                interval: null,
                reaccuring: false,
                type: "income"
              },
            ])
          }>
          <FontAwesomeIcon size={25} icon={faAdd} color="black" />
        </Pressable>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 30, alignSelf: 'center', display: "flex", flexDirection:"row"}}>
        <Button title="Save" onPress={onSave} color="black" />
        <Button title="Skip" color="black" onPress={e=> onSkip()} />
      </View>
      </>
  );
};

export default SetupIncome;