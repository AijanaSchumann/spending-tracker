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