import {faDollarSign, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
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
});

type Props = {
  value: 'expense' | 'income';
  onValueChange(val: 'expense' | 'income'): void;
};

const ExpenseIncomeSwitch = (props: Props) => {
  const type = props.value;

  const expensesButtonStyle =
    type === 'expense'
      ? [styles.selected, {borderColor: 'red'}]
      : styles.unselected;

  const incomeButtonStyle =
    type === 'income'
      ? [styles.selected, {borderColor: 'green'}]
      : styles.unselected;

  return (
    <View style={{alignSelf: 'center', flexDirection: 'row'}}>
      <Pressable style={[styles.button, expensesButtonStyle, {marginRight: 5}]} onPress={e => props.onValueChange('expense')}>
        <FontAwesomeIcon
          style={{marginRight: 5, color: 'red'}}
          icon={faShoppingCart}
        />
        <Text style={type === 'expense' && styles.text}>Expense</Text>
      </Pressable>
      <Pressable style={[styles.button, incomeButtonStyle]} onPress={e => props.onValueChange('income')}>
        <FontAwesomeIcon
          style={{marginRight: 5, color: 'green'}}
          icon={faDollarSign}
        />
        <Text style={type === 'income' && [styles.text, {textShadowColor: 'green'}]}>Income</Text>
      </Pressable>
    </View>
  );
};

export default ExpenseIncomeSwitch;
