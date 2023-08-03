import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Entry} from '../../models/entry';
import {Dispatcher, RootState} from '../../store/store';
import '../../extensions/DateExtension';
import DataEntryForm from './DataEntryForm';
import { saveIncome, saveUpdatedIncome } from '../../store/slices/incomeSlice';



type Props = {
  onClose(): void;
};

const AddIncome: FC<Props> = (props: Props) => {
  const editEntry = useSelector(
    (state: RootState) => state.income.entryToUpdate,
  );

  const categories = useSelector(
    (state: RootState) => state.income.categories,
  );

  const dispatch = useDispatch<Dispatcher>();

  const updateEntry = (updatedEntry: Entry) => {
    
      dispatch(saveUpdatedIncome(updatedEntry));
      props.onClose();
    
  };

  const saveEntry = async (newEntry: Entry) => {
    
      newEntry.type="income";
      await dispatch(saveIncome(newEntry));
    
  };

  return <DataEntryForm data={editEntry} categories={categories} onSave={saveEntry} onUpdate={updateEntry} />
};

export default AddIncome;
