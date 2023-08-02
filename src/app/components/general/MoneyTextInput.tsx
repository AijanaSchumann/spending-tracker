import React, {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginLeft: 70,
    marginRight: 70,
    marginTop: 20,
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
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={props.value}
          style={[styles.text, styles.textInput]}
          placeholder="0.00"
          keyboardType="numeric"
          onChangeText={props.onChangeText}></TextInput>
        <Text style={[styles.text, styles.adornment]}>€</Text>
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
