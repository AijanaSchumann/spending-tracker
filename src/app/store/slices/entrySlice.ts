//all good, added later

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry } from "../../models/entry";

export interface EntryState {
    entries: Entry[]
}

const initialState: EntryState = {
    entries: []
}

export const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers:{
    add: (state, action: PayloadAction<Entry>) =>{
        state.entries = state.entries.concat(action.payload);
    },
    addAll: (state, action: PayloadAction<Entry[]>) =>{
      state.entries = action.payload;
  }

  }
});

export const {add, addAll} = entrySlice.actions;

export default entrySlice.reducer;