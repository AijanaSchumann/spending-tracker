import { configureStore } from "@reduxjs/toolkit";
import entryReducer from './slices/expenseSlice';
import incomeReducer from "./slices/incomeSlice";
import settingsReducer from "./slices/settingsSlice";


export const store = configureStore({
  reducer:{
    spending: entryReducer,
    income: incomeReducer,
    settings: settingsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatcher = typeof store.dispatch;