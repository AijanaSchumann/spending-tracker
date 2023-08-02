//all good, added later

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import databaseService from "../../services/dbService";
import { Entry } from "../../models/entry";
import { Category } from "../../models/category";
import { createInitialCategories, loadDataOnStartup } from "../actions/SetupAction";

export interface IncomeState {
    income: Entry[],
    categories: Category[],
    entryToUpdate: Entry | null
}

const initialState: IncomeState = {
    income: [],
    categories: [],
    entryToUpdate: null
}

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers:{
    editIncome: (state, action: PayloadAction<Entry>) => {
      state.entryToUpdate = action.payload;
    }

  },
  extraReducers(builder){
   builder.addCase(loadDataOnStartup.fulfilled, (state, action) =>{
    const payload = action.payload;
    state.income = payload.data?.income || [];
    state.categories = payload.categories.income;
   }),
   builder.addCase(createInitialCategories.fulfilled, (state, action)=>{
    state.categories = action.payload.income;
   }),
   builder.addCase(saveIncome.fulfilled, (state, action)=>{
    state.income = state.income.concat(action.payload);
   }),
   builder.addCase(saveUpdatedIncome.fulfilled, (state, action)=>{
    const data = action.payload;
    state.entryToUpdate=null;
    state.income = state.income.map(el =>
      el.id === data.id ? data : el
    );
   }),
   builder.addCase(saveAllIncome.fulfilled,(state, action)=>{
    state.income = action.payload
   })
  }
});

//extra actions

export const saveIncome = createAsyncThunk("income/saveIncome", async (data: Entry, thunkAPI)=>{
  const newId = await databaseService.saveIncome(data);
  data.id = newId;
  return data;

});

export const saveUpdatedIncome = createAsyncThunk(
  "income/updateIncome",
  async (data: Entry) => {
    //TODO: add check
    const result = await databaseService.saveEntry(data);
    return data;
  },
);

export const saveAllIncome = createAsyncThunk('income/setup', async (data: Entry[], thunkAPI)=>{
  await databaseService.saveAllIncome(data);
  //reload data to get ids
  const result = await databaseService.loadIncome();
  console.log("reloaded data")
  console.log(result);
  return result;
});

export const { } = incomeSlice.actions;

export default incomeSlice.reducer;