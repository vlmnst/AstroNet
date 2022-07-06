import {createSlice, dispatch} from '@reduxjs/toolkit';
import axios from 'axios';
require('dotenv').config();
// const { ROUTE } = process.env;
const ROUTE = "https://glacial-brushlands-14508.herokuapp.com"

export const userSlice = createSlice({
    name : "ALL_PRODUCTS",
    initialState : {
        allProducts: [],
        allProductsFiltered:[] 
    },
    reducers:{
        getAllProducts(state,action){
            state.allProducts = action.payload
            state.allProductsFiltered = action.payload
        }
    }
});

export const getAllProducts = ()=> async(dispatch) => {
    try {
        var json = await axios.get(ROUTE +"/products/getAll")
        dispatch(userSlice.actions.getAllProducts(json.data))

    } catch (e) {
        console.log(e)
    }
}   


export default userSlice.reducer