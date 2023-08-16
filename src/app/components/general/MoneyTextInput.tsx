import React, {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginLeft: 70,
    marginRight: 70,
    marginTop: 30,
  },
  text: {
    fontSize: 25,
  },
  textInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginRight: 5,
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
  },
  adornment: {},
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
  },
});

type Props = {
  value: string;
  onChangeText(newValue: string): void;
  error: boolean;
};

const MoneyTextInput: FC<Props> = (props: Props) => {

    const currency = useSelector((state: RootState)=> state.settings.currency).symbol;

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={props.value}
          style={[styles.text, styles.textInput]}
          placeholder="amount"
          keyboardType="numeric"
          onChangeText={props.onChangeText}></TextInput>
        <Text style={[styles.text, styles.adornment]}>{currency}</Text>
      </View>

      <View>
        {props.error && props.value.length === 0 && (
          <Text style={[styles.error]}>Cannot be empty</Text>
        )}
      </View>
    </View>
  );
};

export default MoneyTextInput;
