//all good, added later

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Income } from "../../models/income";
import databaseService from "../../services/dbService";

export interface IncomeState {
    income: Income[]
}

const initialState: IncomeState = {
    income: []
}

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers:{
    add: (state, action: PayloadAction<Income>) =>{
        state.income = state.income.concat(action.payload);
        databaseService.saveIncome(action.payload);
    },
    addAllIncome: (state, action: PayloadAction<Income[]>) =>{
      state.income = action.payload;
      databaseService.saveAllIncome(action.payload);
  }
  },
  extraReducers(builder){
   builder.addCase(loadIncome.fulfilled, (state, action) =>{
    state.income = action.payload
   })
  }
});

export const loadIncome = createAsyncThunk('income/loadIncome', async (thunkAPI)=>{
  
 const result = await databaseService.loadIncomes();
 return result;

});

export const {add, addAllIncome} = incomeSlice.actions;

export default incomeSlice.reducer;