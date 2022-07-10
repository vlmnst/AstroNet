import {createSlice, dispatch} from '@reduxjs/toolkit';
import axios from 'axios';
import { ROUTE }  from '@env';
// const ROUTE = "http://localhost:3001";


export const userSlice = createSlice({
    name : "ALL_PRODUCTS",
    initialState : {
        allProducts: [],
        allProductsFiltered:[],
        categories:[] 
    },
    reducers:{
        getAllProducts(state,action){
            state.allProducts = action.payload
            state.allProducts.map((p)=> (state.categories.includes(p.category))? null :
                state.categories.push(p.category))
        },
        getProductsByCategory(state,action){
            state.allProductsFiltered = action.payload
        },
        getByPrice(state,action){
            if (action.payload === "higher"){
                let neworder = state.allProductsFiltered.sort(function (a,b){
                    if (a.price < b.price) {
                        return 1;
                    }
                    if (b.price < a.price) {
                        return -1;
                    }
                    return 0;
                });
                state.allProductsFiltered = neworder 
            }
            if (action.payload === "lower"){
                let neworder = state.allProductsFiltered.sort(function (a,b){
                    if (a.price < b.price) {
                        return -1;
                    }
                    if (b.price < a.price) {
                        return 1;
                    }
                    return 0;
                });
                state.allProductsFiltered = neworder
            }
            
        },
        clearCache(state){
            state.allProductsFiltered = []
        },
        getProductsByName(state,action){
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
export const getProductsByCategory = (category)=> async(dispatch) => {
    try {
        var json = await axios.get(ROUTE +"/products/category/"+category)
        dispatch(userSlice.actions.getProductsByCategory (json.data))

    } catch (e) {
        console.log(e)
    }
}
export const getProductsByName = (name)=> async(dispatch) => {
    try {
        var json = await axios.get(ROUTE+"/products/search/"+name)
        dispatch(userSlice.actions.getProductsByName (json.data))

    } catch (e) {
        console.log(e)
    }
} 
// export const getByPrice = (order)=> (dispatch) => {
//         dispatch(userSlice.actions.getByPrice(order))
// }
export const {getByPrice, clearCache}=userSlice.actions

export default userSlice.reducer