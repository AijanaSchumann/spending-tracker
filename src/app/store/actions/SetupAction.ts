import { createAsyncThunk } from "@reduxjs/toolkit";
import databaseService from "../../services/dbService";
import { groupBy } from "../../utils/utils";
import defaultDataService from "../../services/defaultDataService";


export const createInitialCategories = createAsyncThunk('setup/create-categories', async (thunkAPI)=>{

    return await defaultDataService.createDefaultCategories();
});

export const loadDataOnStartup = createAsyncThunk('startup/loadData', async (thunkAPI)=>{

    const entries = await databaseService.loadEntries();
    const categories = await databaseService.loadCategories();
    const settings = await databaseService.loadSettings();
    return {categories: categories, data: entries, settings: settings};

});