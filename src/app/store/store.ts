import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './slices/categorySlice';
import entryReducer from './slices/entrySlice';

export const store = configureStore({
  reducer:{
    categories: categoryReducer,
    entries: entryReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatcher = typeof store.dispatch;