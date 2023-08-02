import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomPicker from '../../general/picker/CustomPicker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {Picker} from '@react-native-picker/picker';
import { intervalList } from '../../../constants/intervalList';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    borderColor: 'lightgrey',
    borderRadius: 5,
    borderWidth: 1,
  },
  element: {marginBottom: 10},
  label: {fontSize: 15},
  textInput: {
    flex: 0,
    fontSize: 20,
    marginTop: 5,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  main:{
    flexBasis: '80%'
  },
  switch:{
   marginTop: 5,
   marginRight: 5
  },
  deleteButtonContainer: {
    alignSelf: 'center',
    flexBasis: '20%',
    justifyContent: 'space-around',
    padding: 10,
  }
});

type furtherIncomeType = {
  note: string;
  value: number;
  key: number;
  interval: string | null;
  reaccuring: boolean;
};

type Props = {
  data: furtherIncomeType;
  updateFurtherIncome(id: number, newData: any, attribute: string): void;
  removeFurtherIncome(id: number): void;
};

const AddFurtherIncome = (props: Props) => {
  const data = props.data;
  const updateFurtherIncome = props.updateFurtherIncome;

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text>Income</Text>
        <TextInput
          style={[styles.textInput, styles.element]}
          placeholder="amount"
          value={data.value.toString()}
          onChangeText={ev =>
            updateFurtherIncome(data.key, Number(ev), 'value')
          }
          keyboardType="numeric"
        />
        <Text>Repeating?</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          
          <Switch
          style={styles.switch}
            value={data.reaccuring}
            onValueChange={() =>
              updateFurtherIncome(data.key, !data.reaccuring, 'reaccuring')
            }
          />
          <View style={{flex: 1}}>
          {data.reaccuring && (
              <CustomPicker
              value={data.interval|| ""}
                selectedValue={data.interval || 'weekly'}
                onValueChange={ev =>
                  updateFurtherIncome(data.key, ev, 'interval')
                }>
                {intervalList.map(el => (
                  <Picker.Item label={el.value} value={el.value} key={el.value} />
                ))}
              </CustomPicker>
            
          )}
          </View>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="note"
          value={data.note}
          onChangeText={ev => updateFurtherIncome(data.key, ev, 'note')}
        />
      </View>
      <View style={styles.deleteButtonContainer}>
        <Pressable onPress={ev => props.removeFurtherIncome(data.key)}>
          <FontAwesomeIcon
            size={35}
            icon={faTrashAlt}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default AddFurtherIncome;
