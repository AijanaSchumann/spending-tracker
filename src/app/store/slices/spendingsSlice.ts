//all good, added later

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Entry} from '../../models/entry';
import databaseService from '../../services/dbService';
import { Category } from '../../models/category';
import { createInitialCategories, loadDataOnStartup } from '../actions/SetupAction';
import { saveCategory } from '../actions/SettingsActions';

export interface EntryState {
  entries: Entry[],
}

const initialState: EntryState = {
  entries: []
};

export const entrySlice = createSlice({
  name: 'spending',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(loadDataOnStartup.fulfilled, (state, action) =>{
      const payload = action.payload;
      state.entries = payload.data || []
     }),
    builder.addCase(saveSpending.fulfilled, (state, action) => {
      state.entries = state.entries.concat(action.payload);
    }),
    builder.addCase(updateSpending.fulfilled, (state, action)=>{
      const data = action.payload;
      state.entries = state.entries.map(el =>
        el.id === data.id ? data : el
      );
    }),
    builder.addCase(saveAllIncome.fulfilled, (state, action)=>{
      state.entries = action.payload
    })
  },
});

/***
 * Save income or expense action
 */
export const saveSpending = createAsyncThunk(
  'spending/save',
  async (data: Entry, thunkAPI) => {
    const result = await databaseService.saveEntry(data);
    data.id = result;
    return data;
  },
);

/***
 * update income or expense action
 */
export const updateSpending = createAsyncThunk(
  'spending/update',
  async (data: Entry, thunkAPI) => {
    const result = await databaseService.saveEntry(data);
    return data;
  },
);

export const saveAllIncome = createAsyncThunk('spending/setupIncome', async (data: Entry[], thunkAPI)=>{
  await databaseService.saveAllIncome(data);
  //reload data to get ids
  const result = await databaseService.loadIncome();
  console.log("reloaded data")
  console.log(result);
  return result;
});

export const { } = entrySlice.actions;

export default entrySlice.reducer;
