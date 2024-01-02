import {faDollarSign, faShoppingCart, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import ExpenseIncomeSwitch from '../general/ExpenseIncomeSwitch';
import { Entry } from '../../models/entry';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatcher, RootState } from '../../store/store';
import { deleteSpending, saveSpending, updateSpending } from '../../store/slices/spendingsSlice';
import DataEntryForm from './DataEntryForm';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  header: {
    fontSize: 20,
    alignItems:"center",
    alignSelf: "center",
    textAlign: "center",
    fontWeight: 'bold',
    marginBottom: 30,
    flexGrow: 1
  },
});

type Props = {
  editElement: Entry | null
  isVisible: boolean;
  onClose(): void;
};

const DataEntryModal = (props: Props) => {

  const dispatch = useDispatch<Dispatcher>();

  const categories = useSelector((state: RootState)=> state.settings.categories.data);

  const [type, setType] = useState<'expense' | 'income'>(props.editElement?.type || 'expense');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(()=>{

    const filtered = categories.filter(el => el.type === type);
    setFilteredCategories(filtered);

  }, [categories, type]);

  const action = props.editElement ? "Update" : "New";

  const updateEntry = (updatedEntry: Entry) => {
    
    updatedEntry.type=type;
    dispatch(updateSpending(updatedEntry));
    props.onClose();
};

const saveEntry = async (newEntry: Entry) => {
  
    newEntry.type=type;
    await dispatch(saveSpending(newEntry));
};

const onDelete = () =>{

  dispatch(deleteSpending(props.editElement!));
  props.onClose();
}

  return (
    <Modal
      animationType="slide"
      onRequestClose={e => props.onClose()}
      presentationStyle="pageSheet"
      visible={props.isVisible}>
      <View style={{padding: 20, display: 'flex'}}>
      <View style={{flexDirection: "row"}}>
          <Pressable onPress={props.onClose}>
            <FontAwesomeIcon
              style={{alignSelf: 'flex-start'}}
              size={20}
              icon={faXmark}
            />
          </Pressable>
          <Text style={styles.header}>{action} {type}</Text>
        </View>
       
        <ExpenseIncomeSwitch value={type} onValueChange={setType} />
        <DataEntryForm data={props.editElement} categories={filteredCategories} onSave={saveEntry} onUpdate={updateEntry} onDelete={onDelete} />
      </View>
    </Modal>
  );
};

export default DataEntryModal;
