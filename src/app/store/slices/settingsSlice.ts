import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import databaseService from "../../services/dbService";
import { createInitialCategories, loadDataOnStartup } from "../actions/SetupAction";
import { Currency, currencyList } from "../../constants/currencyList";
import { SaveSetting, SupportedSettings } from "../../models/settings";
import { Category } from "../../models/category";
import { deleteCategory, saveCategory, saveShowCategoryIcons, updateCategory } from "../actions/SettingsActions";

type CategoryState = {
    income: Category[],
    expense: Category[],
    showIcons: boolean
}

export interface SettingsState {
    appFirstRun: boolean | null,
    currency: Currency,
    categories: CategoryState
}

const initialState: SettingsState = {
    currency: currencyList[0],
    appFirstRun: null,
    categories: {
        income: [],
        expense: [],
        showIcons: false
    }
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
    const payload = action.payload;
    const otherSettings = payload.settings;

    for(const prop in state){
        if(otherSettings[prop])
           state[(prop as SupportedSettings)] = otherSettings[prop];
    }

    state.categories.expense = payload.categories.expense;
    state.categories.income = payload.categories.income;

   }),
   builder.addCase(saveSetting.fulfilled, (state, action)=>{
    const payload = action.payload;
    state[payload.settingsName] = payload.value
   }),
   builder.addCase(createInitialCategories.fulfilled, (state, action)=>{
    state.categories.expense = action.payload.expense;
    state.categories.income = action.payload.income;
   }),
   builder.addCase(saveCategory.fulfilled, (state, action)=>{
    const data = action.payload;
    if(data){
        state.categories[data.type] = state.categories[data.type].concat(data);
    }
  }),
  builder.addCase(updateCategory.fulfilled, (state, action)=>{

    const data = action.payload?.data;
    if(data){
        if(action.payload?.switchType){
            state.categories[data.type] = state.categories[data.type].concat(data);
            state.categories[data.type === "expense" ? "income": "expense"] = state.categories[data.type === "expense" ? "income": "expense"].filter(el => el.id != data.id);
        }else{
            state.categories[data.type] = state.categories[data.type].map(el => el.id == data.id ? data : el);
        }
    }
  }),
  builder.addCase(deleteCategory.fulfilled, (state, action)=>{
    const data = action.payload;
    if(data)
      state.categories[data.type] = state.categories[data.type].filter(el => el.id != data.id);
  }),
  builder.addCase(saveShowCategoryIcons.fulfilled, (state, action)=>{
    state.categories.showIcons = action.payload;
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