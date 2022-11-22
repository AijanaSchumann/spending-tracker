import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Category } from "../../models/category"

export interface CategoryState{
    categories: Category[]
}

const initialState : CategoryState ={
    categories: []
}

export const categorySlice = createSlice({
   name: "category",
   initialState,
   reducers:{
     add: (state, action: PayloadAction<Category>) => {
        state.categories = state.categories.concat(action.payload);
     },
     //addAll: (state, action)
     delete: (state, action: PayloadAction<number>) =>{

     },
     update: (state, action: PayloadAction<number>) =>{

     }
   },
   extraReducers(builder){
    builder.addCase(loadCategories.fulfilled, (state, action) =>{
    // state.categories = state.categories.concat(action.payload);
    })
   }

});

export const loadCategories = createAsyncThunk('categories/loadCategories', async ()=>{
  //load data
});

export const {add} = categorySlice.actions;
export default categorySlice.reducer;