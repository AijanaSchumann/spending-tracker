//all good, added later

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Entry} from '../../models/entry';
import databaseService from '../../services/dbService';
import { Category } from '../../models/category';
import { createInitialCategories, loadDataOnStartup } from '../actions/SetupAction';
import { saveCategory } from '../actions/SettingsActions';

export interface EntryState {
  entries: Entry[];
  categories: Category[];
  entryToUpdate: Entry | null;
}

const initialState: EntryState = {
  entries: [],
  entryToUpdate: null,
  categories: []
};

export const entrySlice = createSlice({
  name: 'spending',
  initialState,
  reducers: {
    editSpending: (state, action: PayloadAction<Entry>) => {
      state.entryToUpdate = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(loadDataOnStartup.fulfilled, (state, action) =>{
      const payload = action.payload;
      state.entries = payload.data.expense || []
      state.categories = payload.categories.expense;
     }),
     builder.addCase(createInitialCategories.fulfilled, (state, action)=>{
      state.categories = action.payload.expense;
     }),
    builder.addCase(saveExpense.fulfilled, (state, action) => {
      state.entries = state.entries.concat(action.payload);
    }),
    builder.addCase(saveUpdatedExpense.fulfilled, (state, action)=>{
      const data = action.payload;
      state.entryToUpdate=null;
      state.entries = state.entries.map(el =>
        el.id === data.id ? data : el
      );
    }),
    builder.addCase(saveCategory.fulfilled, (state, action)=>{
      const data = action.payload;
      if(data?.type === "expense"){
        state.categories = state.categories.concat(data);
      }
    })
  },
});

export const saveExpense = createAsyncThunk(
  'spending/saveExpense',
  async (data: Entry, thunkAPI) => {
    const result = await databaseService.saveEntry(data);
    data.id = result;
    return data;
  },
);

export const saveUpdatedExpense = createAsyncThunk(
  'spending/updateExpense',
  async (data: Entry, thunkAPI) => {
    const result = await databaseService.saveEntry(data);
    return data;
  },
);

export const { editSpending: editEntry} =
  entrySlice.actions;

export default entrySlice.reducer;
