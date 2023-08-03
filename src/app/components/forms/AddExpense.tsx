import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Entry} from '../../models/entry';
import {saveExpense, saveUpdatedExpense} from '../../store/slices/expenseSlice';
import {Dispatcher, RootState} from '../../store/store';
import '../../extensions/DateExtension';
import DataEntryForm from './DataEntryForm';



type Props = {
  onClose(): void;
};

const AddExpense: FC<Props> = (props: Props) => {
  const editEntry = useSelector(
    (state: RootState) => state.spending.entryToUpdate,
  );

  const categories = useSelector(
    (state: RootState) => state.spending.categories,
  );

  const dispatch = useDispatch<Dispatcher>();

  const updateEntry = (updatedEntry: Entry) => {
    
      dispatch(saveUpdatedExpense(updatedEntry));
      props.onClose();
  };

  const saveEntry = async (newEntry: Entry) => {
    
      newEntry.type="expense";
      await dispatch(saveExpense(newEntry));
  };

  return <DataEntryForm data={editEntry} categories={categories} onSave={saveEntry} onUpdate={updateEntry} />
};

export default AddExpense;
