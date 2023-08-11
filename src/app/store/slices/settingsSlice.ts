import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import databaseService from "../../services/dbService";
import { loadDataOnStartup } from "../actions/SetupAction";
import { Currency, currencyList } from "../../constants/currencyList";
import { SaveSetting, SupportedSettings } from "../../models/settings";

export interface SettingsState {
    appFirstRun: boolean | null,
    currency: Currency
}

const initialState: SettingsState = {
    currency: currencyList[0],
    appFirstRun: null
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers:{
    setAppFirstRun: (state, action: PayloadAction<boolean>) =>{
        state.appFirstRun = action.payload;
    }
  },
  extraReducers(builder){
   builder.addCase(loadDataOnStartup.fulfilled, (state, action) =>{
    const payload = action.payload.settings;

    for(const prop in state){
        if(payload[prop])
           state[(prop as SupportedSettings)] = payload[prop];
    }
   }),
   builder.addCase(saveSetting.fulfilled, (state, action)=>{
    const payload = action.payload;
    state[payload.settingsName] = payload.value
   })
  }
});

//extra actions

export const saveSetting = createAsyncThunk("settings/saveSetting", async (data: SaveSetting, thunkAPI)=>{
  
    databaseService.saveSetting(data.settingsName, data.value);
    return { settingsName: data.settingsName, value: data.value };
});

export const updateSetting = createAsyncThunk("settings/updateSetting", async (data: SaveSetting, thunkAPI)=>{
  
    databaseService.saveSetting(data.settingsName, data.value);
    return { settingsName: data.settingsName, value: data.value };
});

export const { setAppFirstRun } = settingsSlice.actions;


export default settingsSlice.reducer;