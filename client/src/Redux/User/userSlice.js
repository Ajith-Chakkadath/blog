import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState, // Corrected typo here
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart:(state,action)=>{
            state.loading = true;
            state.error = null;
        },
        updateSucess:(state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart:(state) =>{
            state.loading = false;
            state.error = null;
        },
        deleteUserSucess : (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutSucess : (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },

    },
});

export const { signInStart, signInSuccess, signInFailure,updateFailure,updateStart,
    updateSucess,deleteUserStart,deleteUserFailure,deleteUserSucess,signOutSucess } = userSlice.actions;

export default userSlice.reducer;
