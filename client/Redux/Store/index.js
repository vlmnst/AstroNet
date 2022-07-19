import {configureStore} from '@reduxjs/toolkit';
// import {combineReducers} from 'redux'; En caso de utilizar <1 reducer...
import userSlice from "../Slice/index.js";
import realUserSlice from '../Slice/userSlice.js';

const store =configureStore({
    reducer:{
        ALL_PRODUCTS : userSlice,
        USER : realUserSlice
    }
})
export default store

