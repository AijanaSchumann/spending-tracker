import { createAsyncThunk } from "@reduxjs/toolkit";
import databaseService from "../../services/dbService";
import { groupBy } from "../../utils/utils";
import defaultDataService from "../../services/defaultDataService";


export const createInitialCategories = createAsyncThunk('setup/create-categories', async (thunkAPI)=>{

    const result = await defaultDataService.createDefaultCategories();
    const groupedCategories = groupBy(result, i => i.type);
    return groupedCategories;

});

export const loadDataOnStartup = createAsyncThunk('startup/loadData', async (thunkAPI)=>{

    const entries = await databaseService.loadEntries();
    const categories = await databaseService.loadCategories();
    const groupedCategories = groupBy(categories, i => i.type);
    const groupedEntries = groupBy(entries, i => i.type);
    return {categories: groupedCategories, data: groupedEntries}

});