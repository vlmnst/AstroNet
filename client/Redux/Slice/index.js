import {createSlice, dispatch} from '@reduxjs/toolkit';
import axios from 'axios';

import { ROUTE } from "../../EndpointAPI"
import { getPromRate } from '../../Src/utils/getPromRate';

export const userSlice = createSlice({
    name : "ALL_PRODUCTS",
    initialState : {
        allProducts: [],
        allProductsFiltered:[],
        categories:[],
        purchaseProducts: [],
        AllUsers:[],
        AllUsersFiltered: [],
        cart:[],
        pageScrollinf:0,
        paginateProductsScrollinf:[],
        wishListData:[],
        wishList:[]
    },
    reducers:{
        setpaginateProducts(state,action){
            state.paginateProductsScrollinf = action.payload
        },
        setPageScrollinf(state,action){
            state.pageScrollinf = action.payload
        },
        getAllProducts(state,action){
            state.allProducts = action.payload
            state.allProductsFiltered = action.payload
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

            if (action.payload === "r-lower"){
                let rated = state.allProductsFiltered.filter(p => p.reviews.length > 0) // rated = prods con reviews [{}, {}, {}]

                let neworder = rated.sort(function (a,b){
                    if (getPromRate(a) < getPromRate(b)) {
                        return -1;
                    }
                    if (getPromRate(b) < getPromRate(a)) {
                        return 1;
                    }
                    return 0;
                });
                state.allProductsFiltered = neworder
            }

            if (action.payload === "r-higher"){
                let rated = state.allProductsFiltered.filter(p => p.reviews.length > 0) // rated = prods con reviews [{}, {}, {}]

                let neworder = rated.sort(function (a,b){
                    if (getPromRate(a) < getPromRate(b)) {
                        return 1;
                    }
                    if (getPromRate(b) < getPromRate(a)) {
                        return -1;
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
        },
        getCategories(state,action){
            state.categories = action.payload
        },
        //------------------Admin-------------------
        getAllUsers(state, action) {
            state.AllUsers = action.payload
            state.AllUsersFiltered = action.payload
        },
        searchUser(state,action){
            let min = action.payload.toLowerCase()
            let user =[]
            state.AllUsers.map((u)=> {
                if (
                    u.role.toLowerCase().includes(min) || 
                    u.username.toLowerCase().includes(min) ||
                    u.firstname.toLowerCase().includes(min) ||
                    u.lastname.toLowerCase().includes(min) ||
                    u.email.toLowerCase().includes(min) ||
                    u.phone === action.payload ||
                    u.dni.toString() === action.payload
                ){
                    user.push(u)
                }
        })
            state.AllUsersFiltered = user;
        },
        resetAdminProducts(state,action){
            state.allProductsFiltered =[ ...state.allProducts ]
        },

        cartCreate(state, action){
            state.cart = [...state.cart, action.payload]
        },
        initialCartUpdate(state, action){
            state.cart = action.payload
        },
        cartUpdate(state, action){
            state.cart = action.payload
        },
        deleteCart(state){
            state.cart = []
        },
        deleteCartItem(state, action){
            let filteredCart = state.cart.filter((x)=>{
                x.id !== action.payload
            })
        },
        wishListAddInfo(state, action){
            state.wishListData =  action.payload
            //console.log(state.wishListData);
        },
        wishListComming(state, action){
              state.wishList = state.wishList.concat(action.payload)
              //console.log(state.wishList)
        },
        undoItemWishList(state, action) {
            state.wishList = state.wishList.filter(i => i.id !== action.payload)
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
};
export const getProductsByCategory = (category)=> async(dispatch) => {
    try {
        var json = await axios.get(ROUTE +"/products/category/"+category)
        // let productWithStock = json.data.filter((prod)=> prod.stock > 0)
        dispatch(userSlice.actions.getProductsByCategory (json.data))

    } catch (e) {
        console.log(e)
    }
};
export const getProductsByName = (name)=> async(dispatch) => {
    try {
        var json = await axios.get(ROUTE+"/products/search/"+name.toLowerCase())
        //  let productWithStock = json.data.filter((prod)=> prod.stock > 0)
        dispatch(userSlice.actions.getProductsByName (json.data))

    } catch (e) {
        console.log(e)
    }
};
export const createProduct = (product)=> async(dispatch) => {
    try {
        await axios.post(ROUTE +"/products/create", product);
    } catch (e) {
        alert(!e.response.data.error ? e.response.data : e.response.data.error)
    };
};
export const getCategories = ()=> async(dispatch) => {
    try {
        var json = await axios.get(ROUTE+"/products/getCategories")
        dispatch(userSlice.actions.getCategories (json.data))
    } catch (e) {
        console.log(e)
    }
};
//------------------Admin-------------------
export const PutPrivileges = (payload)=> async(dispatch) => {
    const {name,privileges} = payload
    try {
        await axios.put(ROUTE+"/users/privileges/"+name, privileges)
    } catch (e) {
        console.log(e)
    }
};
export const PutBanned = (payload)=> async() => {
    const {name,privileges} = payload
    try {
        await axios.put(ROUTE+"/users/banned/"+name, privileges)
    } catch (e) {
        console.log(e)
    }
};
export const ModifyProducts = (payload)=> async() => {
    const {id,product} = payload
    try {
        await axios.put(ROUTE+"/products/update/"+id, product)
    } catch (e) {
        console.log(e)
    }
};
export const getAllUsers = () => async (dispatch) => {
    try {
        var json = await axios.get(ROUTE + "/users/getAll")
        dispatch(userSlice.actions.getAllUsers(json.data))
    } catch (e) {
        console.log(e)
    }
;}

export const cartCreate = (payload) => async(dispatch) => {
    dispatch(userSlice.actions.cartCreate(payload))
}

export const initialCartUpdate = (payload) => async(dispatch) => {
    dispatch(userSlice.actions.initialCartUpdate(payload))
}

export const cartUpdate = (payload) => async(dispatch) => {
    dispatch(userSlice.actions.cartUpdate(payload))
} 

export const wishListAddInfo = (payload) => async(dispatch) => {
    //console.log(payload);
    try {
        await axios.post(ROUTE +"/users/addItemWishList", payload);
        //console.log(itemId)
        //console.log(user)
        dispatch(userSlice.actions.wishListAddInfo(payload))
        alert('created successfully');
    } catch (e) {
        alert(!e.response.data.error ? e.response.data : e.response.data.error)
    };

   
}

export const wishListComming = (user) => async(dispatch) => {
    //console.log(user);
    try {
        const info = await axios.get(ROUTE + "/users/wishListComming/"+ user)
        dispatch(userSlice.actions.wishListComming(info.data))
    } catch (error) {
        console.log(error)   
    }
}


export const { undoItemWishList, getByPrice, clearCache,clearAdmin,getAdminByPrice,resetAdminProducts,searchUser, deleteCart, deleteCartItem, setPageScrollinf, setpaginateProducts} =userSlice.actions;

export default userSlice.reducer;