//all good, added later

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Entry} from '../../models/entry';
import databaseService from '../../services/dbService';

export interface EntryState {
  entries: Entry[];
  entryToUpdate: Entry | null;
}

const initialState: EntryState = {
  entries: [],
  entryToUpdate: null,
};

export const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    addAllExpenses: (state, action: PayloadAction<Entry[]>) => {
      state.entries = action.payload;
    },
    editEntry: (state, action: PayloadAction<Entry>) => {
      state.entryToUpdate = action.payload;
    },
    editEntryDone: (state, action: PayloadAction<Entry>) => {
      const findIndex = state.entries.findIndex(
        el => el.id == action.payload.id,
      );
      state.entries[findIndex] = action.payload;
      state.entryToUpdate = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadExpenses.fulfilled, (state, action) => {
      state.entries = action.payload;
    }),
    builder.addCase(saveExpenses.fulfilled, (state, action) => {
      state.entries = state.entries.concat(action.payload);
    }
    );
  },
});

export const loadExpenses= createAsyncThunk(
  'income/loadExpenses',
  async thunkAPI => {
    const result = await databaseService.loadEntries();
    return result;
  },
);

export const saveExpenses = createAsyncThunk(
  'income/saveExpenses',
  async (data: Entry, thunkAPI) => {
    const result = await databaseService.saveEntry(data);
    data.id = result;
    
    return data;
  },
);

export const {addAllExpenses, editEntry, editEntryDone} =
  entrySlice.actions;

export default entrySlice.reducer;
