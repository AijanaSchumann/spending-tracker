import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import databaseService from "../../services/dbService";
import { createInitialCategories, loadDataOnStartup } from "../actions/SetupAction";
import { Currency, currencyList } from "../../constants/currencyList";
import { SaveSetting, SupportedSettings } from "../../models/settings";
import { Category } from "../../models/category";
import { deleteCategory, saveCategory, saveShowCategoryIcons, updateCategory } from "../actions/SettingsActions";

type CategoryState = {
    data: Category[],
    showIcons: boolean,
    selectedCategory: Category | null
    
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
        data: [],
        showIcons: false,
        selectedCategory: null
    }
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers:{
    setAppFirstRun: (state, action: PayloadAction<boolean>) =>{
        state.appFirstRun = action.payload;
    },
    selectCategory: (state, action: PayloadAction<Category | null>) =>{
        state.categories.selectedCategory = action.payload
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

    //move this one into loadData action!
    state.categories.data = payload.categories;
    state.categories.selectedCategory = null;

   }),
   builder.addCase(saveSetting.fulfilled, (state, action)=>{
    const payload = action.payload;
    state[payload.settingsName] = payload.value
   }),
   builder.addCase(createInitialCategories.fulfilled, (state, action)=>{
    state.categories.data = action.payload;
   }),
   builder.addCase(saveCategory.fulfilled, (state, action)=>{
    const data = action.payload;
    if(data){
        state.categories.data = state.categories.data.concat(data);
        state.categories.selectedCategory = null;
    }
  }),
  builder.addCase(updateCategory.fulfilled, (state, action)=>{

    const data = action.payload?.data;
    if(data){

            state.categories.data = state.categories.data.map(el => el.id == data.id ? data : el);
        }
        state.categories.selectedCategory = null;
  }),
  builder.addCase(deleteCategory.fulfilled, (state, action)=>{
    const data = action.payload;
    if(data)
      state.categories.data = state.categories.data.filter(el => el.id != data.id);
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

export const { setAppFirstRun, selectCategory  } = settingsSlice.actions;


export default settingsSlice.reducer;