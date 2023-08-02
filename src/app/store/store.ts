import { configureStore } from "@reduxjs/toolkit";
import entryReducer from './slices/expenseSlice';
import incomeReducer from "./slices/incomeSlice";

export const store = configureStore({
  reducer:{
    spending: entryReducer,
    income: incomeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatcher = typeof store.dispatch;