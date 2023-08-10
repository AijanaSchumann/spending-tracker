import {faDollarSign, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import AddExpense from './AddExpense';
import AddIncome from './AddIncome';
import ExpenseIncomeSwitch from '../general/ExpenseIncomeSwitch';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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

  return (
    <Modal
      animationType="slide"
      onRequestClose={e => props.onClose()}
      presentationStyle="pageSheet"
      visible={props.isVisible}>
      <View style={{padding: 20, display: 'flex'}}>
        <Text style={styles.header}>New {type}</Text>
        <ExpenseIncomeSwitch value={type} onValueChange={setType} />
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
