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

type UpdateCategory = {data: Category, switchType?: boolean}

export const updateCategory = createAsyncThunk("settings/updateCategory", async (data: UpdateCategory)=>{

    
    const result = await databaseService.updateCategory(data.data);

    if(!result){
        //throw error
    }else{
        return data;
    }
});

export const deleteCategory = createAsyncThunk("settings/deleteCategory", async (data: Category)=>{

   
    const result = await databaseService.deleteCategory(data);
    
    if(!result){
        //throw error
    }else{
        return data;
    }
});

export const saveShowCategoryIcons = createAsyncThunk("settings/showCategoryIcons", async (data: boolean)=>{

    const categoryIconsSetting = {showIcons: data};
    await databaseService.saveSetting("categories", categoryIconsSetting);
    
    return data;
});