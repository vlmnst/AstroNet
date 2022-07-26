import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { ROUTE } from "@env";
const ROUTE = "http://192.168.0.16:3001";
// const ROUTE = "https://proyectofinal-api-777.herokuapp.com";

export const realUserSlice = createSlice({
    name: "USER",
    initialState: {
        userName: "",
        role: "guest",
        email: "",
        img: "",
        productHistory: [],
        purchaseProducts: [],
        allProductsUser: [],
        userFullData: [],
    },
    reducers: {
        getPurchaseProducts(state, action) {
            state.purchaseProducts = action.payload;
        },
        getPurchaseOrders(state, action) {
            state.productHistory = action.payload;
        },
        getUserData(state, action) {
            state.userName = action.payload;
        },
        setUserData(state, action) {
            const { username, email, role } = action.payload;
            state.userName = username;
            state.role = role;
            state.email = email;
        },
        getUserFullData(state, action) {
            state.userFullData = action.payload;
        },
        setLogOut(state) {
            state.userName = "";
            state.role = "guest";
            state.email = "";
            state.img = "";
            state.productHistory = [];
            state.purchaseProducts = [];
            state.allProductsUser = [];
            state.userFullData = [];
        },
        getPurchasedProductsAllUsers(state, action){
            state.allpurchaseProducts = action.payload
            state.allpurchaseProductsFull= action.payload
        },
        searchOrder(state,action){
            let info =[]
            state.allpurchaseProducts.map((u)=> {
                if (
                    u.order === action.payload
                ){
                    info.push(u)
                }
        })
            state.allpurchaseProducts = info;
        },
        FilterByStatus(state,action){
            let info = state.allpurchaseProductsFull;
            let array=[];
            info.map(d=>d.status===action.payload?array.push(d):null)
            state.allpurchaseProducts = array
        }
    },
});

export const getPurchaseProducts = (username) => async (dispatch) => {
    try {
        const { data } = await axios.get(
            ROUTE + "/users/purchasedProducts/" + username
        );
        dispatch(realUserSlice.actions.getPurchaseProducts(data));
    } catch (error) {
        console.log(error);
    }
};

export const getPurchaseOrders = (username) => async (dispatch) => {
    try {
        const { data } = await axios.get(
            ROUTE + "/users/productsHistory/" + username
        );
        dispatch(realUserSlice.actions.getPurchaseOrders(data));
    } catch (error) {
        console.log(error);
    }
};

export const putReviewToProduct = (payload) => async () => {
    const { idProduct } = payload;
    try {
        const { data } = await axios.put(
            ROUTE + "/products/putReview/" + idProduct,
            payload
        );
    } catch (error) {
        console.log(error);
    }
};

export const setUserData = (data) => (dispatch) => {
    try {
        dispatch(realUserSlice.actions.setUserData(data));
    } catch (error) {
        console.log(error);
    }
};

export const getUserData = (username) => async (dispatch) => {
    try {
        const { data } = await axios.get(ROUTE + "/users/getData/" + username);
        dispatch(realUserSlice.actions.getUserData(data));
    } catch (error) {
        console.log(error);
    }
};

export const getUserFullData = (username) => async (dispatch) => {
    try {
        // ROUTE
        const { data } = await axios.get(ROUTE + "/users/getUserFull/" + username);
        dispatch(realUserSlice.actions.getUserFullData(data));
    } catch (error) {
        console.log(error);
    }
};
//---------------------------------------------------------------------------------------------
//----------------------------------EXPO PUSH NOTIFICATION-------------------------------------
//---------------------------------------------------------------------------------------------
export const pushToken = (tokenBox) => async () => {
    try {
        await axios.post(ROUTE + "/users/pushToken/",tokenBox);//envio de notificacion de usuario
    } catch (error) {
        console.log(error);
    }
};
//---------------------------------------------------------------------------------------------
export const putToken = (payload) => async () => {
    try {
        await axios.post(ROUTE+"/users/putToken/",payload
        );
    } catch (error) {
        console.log(error);
    }
};
//-----------------------------------------NODEMAILER------------------------------------------
//---------------------------------------------------------------------------------------------
export const sendEmail = (emailData) => async () => {
    try {
        await axios.post(ROUTE + "/users/email/",emailData);
    } catch (error) {
        console.log(error);
    }
};
    //---------------------------------------------------------------------------------------------

    export const getPurchasedProductsAllUsers = ()=> async(dispatch) => {
        try {
            // ROUTE
            const { data } = await axios.get(ROUTE+'/users/getpurchasedProductsAllUsers/');
            dispatch(realUserSlice.actions.getPurchasedProductsAllUsers(data));
        } catch (error) {
            console.log(error);
        };
    };
    export const putpurchasedProducts = (payload)=> async() => {
        try {
            const {order,status} = payload
            await axios.put(ROUTE+'/users/putpurchasedProducts/'+ order, status);
        } catch (error) {
            console.log(error);
        };
    };

    export const functionReset = (data)=> async() => {
        try {
            await axios.put(ROUTE+'/users/resetPassword', data);
            alert('user password reset successfully')
        } catch (error) {
            console.log(error);
        };
    };

export const { setLogOut,searchOrder,FilterByStatus} = realUserSlice.actions;

export default realUserSlice.reducer;
