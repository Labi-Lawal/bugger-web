import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        token: (typeof window !== "undefined") ? localStorage.getItem('access-token') : '' ,
        userData: {}
    },
    reducers: {
        storeAuthToken: (state, action)=> { 
            localStorage.setItem('access-token', action.payload);
            state.token = action.payload 
        },
        storeUserData: (state, action)=> { 
            state.userData = action.payload 
        }, 
        clearUserData: (state)=> { state.userData = {} },
        fetchAuthToken: (state) => { state.token }
    },
});

export const { storeAuthToken, storeUserData, clearUserData } = userSlice.actions;
export default userSlice;

