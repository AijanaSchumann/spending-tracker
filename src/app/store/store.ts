import { PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit";
import entryReducer from './slices/spendingsSlice';
import settingsReducer from "./slices/settingsSlice";
import overviewReducer from "./slices/overviewSlice";



// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  spending: entryReducer,
  settings: settingsReducer,
  overview: overviewReducer
})


export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type Dispatcher = AppStore['dispatch']