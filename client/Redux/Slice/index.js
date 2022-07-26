import {createSlice, dispatch} from '@reduxjs/toolkit';
import axios from 'axios';
// import { ROUTE }  from '@env';
// const ROUTE = "http://192.168.0.16:3001";
const ROUTE = "https://proyectofinal-api-777.herokuapp.com";


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
        paginateProductsScrollinf:[]
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
        alert('created successfully');
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


export const {getByPrice, clearCache,clearAdmin,getAdminByPrice,resetAdminProducts,searchUser, deleteCart, deleteCartItem, setPageScrollinf, setpaginateProducts} =userSlice.actions;

export default userSlice.reducer;