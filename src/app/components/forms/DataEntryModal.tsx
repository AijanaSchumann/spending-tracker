import {faDollarSign, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import AddExpense from './AddExpense';
import AddIncome from './AddIncome';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  text: {
    textShadowRadius: 10,
    textShadowOffset: {width: 5, height: 10},
    textShadowColor: 'red',
  },
  button: {
    borderRadius: 20,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  selected: {
    borderWidth: 2,
  },
  unselected: {
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

type Props = {
  isVisible: boolean;
  onClose(): void;
};

const DataEntryModal = (props: Props) => {

  const [type, setType] = useState<'expense' | 'income'>('expense');

  const expensesButtonStyle =
    type === 'expense'
      ? [styles.selected, {borderColor: 'red'}]
      : styles.unselected;
  const incomeButtonStyle =
    type === 'income'
      ? [styles.selected, {borderColor: 'green'}]
      : styles.unselected;

  return (
    <Modal
      animationType="slide"
      onRequestClose={e => props.onClose()}
      presentationStyle="pageSheet"
      visible={props.isVisible}>
      <View style={{padding: 20, display: 'flex'}}>
        <Text style={styles.header}>New {type}</Text>
        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          <Pressable
            style={[styles.button, expensesButtonStyle, {marginRight: 5}]}
            onPress={e => setType('expense')}>
            <FontAwesomeIcon
              style={{marginRight: 5, color: 'red'}}
              icon={faShoppingCart}
            />
            <Text style={type === 'expense' && styles.text}>Expense</Text>
          </Pressable>

          <Pressable
            style={[styles.button, incomeButtonStyle]}
            onPress={e => setType('income')}>
            <FontAwesomeIcon
              style={{marginRight: 5, color: 'green'}}
              icon={faDollarSign}
            />
            <Text
              style={
                type === 'income' && [styles.text, {textShadowColor: 'green'}]
              }>
              Income
            </Text>
          </Pressable>
        </View>
        {type === 'expense' ? (
          <AddExpense onClose={props.onClose} />
        ) : (
          <AddIncome onClose={props.onClose} />
        )}
      </View>
    </Modal>
  );
};

export default DataEntryModal;
