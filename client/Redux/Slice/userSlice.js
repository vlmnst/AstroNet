import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { ROUTE }  from '@env';
// const ROUTE = "http://localhost:3001";


export const realUserSlice = createSlice({
    name : "USER",
    initialState : {
        userName:'',
        role: 'guest',
        email: '',
        img: '',
        productHistory: [],
        purchaseProducts: [],
        allProductsUser: [],
        userFullData:[]
    },
    reducers:{
        getPurchaseProducts(state, action) {
            state.purchaseProducts = action.payload
        },
        getPurchaseOrders(state, action) {
            state.productHistory = action.payload
        },
        getUserData(state, action) {
            state.userName = action.payload
        },
        setUserData(state, action) {
            const { username, email, role } = action.payload
            state.userName = username
            state.role = role
            state.email = email
        },
        getUserFullData(state, action) {
            state.userFullData = action.payload
        },
        setLogOut(state) {
            state.userName = ''
            state.role = 'guest'
            state.email = ''
            state.img = ''
            state.productHistory = []
            state.purchaseProducts = []
            state.allProductsUser = []
        }
    }
});

export const getPurchaseProducts = (username)=> async(dispatch) => {
    try {
        const { data } = await axios.get(ROUTE + "/users/purchasedProducts/" + username);
        dispatch(realUserSlice.actions.getPurchaseProducts(data));
    } catch (error) {
        console.log(error);
    };
};

export const getPurchaseOrders = (username)=> async(dispatch) => {
    try {
        const { data } = await axios.get(ROUTE + "/users/productsHistory/" + username);
        dispatch(realUserSlice.actions.getPurchaseOrders(data));
    } catch (error) {
        console.log(error);
    };
};

export const putReviewToProduct = (payload)=> async(dispatch) => {
    const { idProduct } = payload;
    try {
        const { data } = await axios.put(ROUTE + "/products/putReview/" + idProduct, payload);
    } catch (error) {
        console.log(error);
    }; 
};

export const setUserData = (data) => async (dispatch) => {
    try {
        await dispatch(realUserSlice.actions.setUserData(data))
    } catch (error) {
        console.log(error);
    }
}

export const getUserData = (username)=> async(dispatch) => {
    try {
        const { data } = await axios.get(ROUTE+'/users/getData/'+username);
        dispatch(realUserSlice.actions.getUserData(data));
    } catch (error) {
        console.log(error);
    };
};

export const getUserFullData = (username)=> async(dispatch) => {
    try {
        // ROUTE
        const { data } = await axios.get(ROUTE+'/users/getUserFull/'+username);
        dispatch(realUserSlice.actions.getUserFullData(data));
    } catch (error) {
        console.log(error);
    };
};



export const { setLogOut } =realUserSlice.actions;

export default realUserSlice.reducer;