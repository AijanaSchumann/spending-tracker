//all good, added later

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Entry} from '../../models/entry';

export interface OverviewState {
    filter: {
        data: Entry[],
        day: number,
        month: number
    }
}

const initialState: OverviewState = {
    filter: {
      data: [],
      day: new Date().getTime(),
      month: new Date().getTime()
    }

};

export const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {

    filterEntries: (state, action) =>{
        state.filter.data = action.payload;
    },
    updateDayFilter: (state, action: PayloadAction<number>)=>{
        state.filter.day=action.payload;
    },
    updateMonthFilter: (state, action: PayloadAction<number>)=>{
        state.filter.month=action.payload;
    }

  },
  extraReducers(builder) {
  
  },
});


export const { filterEntries, updateDayFilter, updateMonthFilter } = overviewSlice.actions;

export default overviewSlice.reducer;
