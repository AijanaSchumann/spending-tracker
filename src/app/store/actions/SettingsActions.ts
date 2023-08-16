import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../../models/category";
import databaseService from "../../services/dbService";


export const saveCategory = createAsyncThunk("settings/newCategory", async (data: Category)=>{

    const result = await databaseService.saveCategory(data);
    
    if(!result){
        //throw error
    }else{
        data.id = result;
        return data;
    }
});

export const updateCategory = createAsyncThunk("settings/updateCategory", async (data: Category)=>{

    throw Error("not implemented")
    const result = await databaseService.saveCategory(data);
    
    if(!result){
        //throw error
    }else{
        data.id = result;
        return data;
    }
});

export const saveShowCategoryIcons = createAsyncThunk("settings/showCategoryIcons", async (data: boolean)=>{

    throw Error("not implemented")
});