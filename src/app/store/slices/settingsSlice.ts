import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import databaseService from "../../services/dbService";
import { loadDataOnStartup } from "../actions/SetupAction";
import { Currency, currencyList } from "../../constants/currencyList";
import { SaveSetting, SupportedSettings } from "../../models/settings";

export interface SettingsState {
    currency: Currency
}

const initialState: SettingsState = {
    currency: currencyList[0]
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers:{

  },
  extraReducers(builder){
   builder.addCase(loadDataOnStartup.fulfilled, (state, action) =>{
    const payload = action.payload;
    //TODO: add
   
   }),
   builder.addCase(saveSetting.fulfilled, (state, action)=>{
    const payload = action.payload;
    state[payload.settingsName] = payload.value
   })
  }
});

//extra actions

export const saveSetting = createAsyncThunk("settings/saveSetting", async (data: SaveSetting, thunkAPI)=>{
  
    //TODO: save to db
    return { settingsName: data.settingsName, value: data.value }

});

export default settingsSlice.reducer;