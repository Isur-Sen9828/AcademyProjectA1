import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state) =>{
            state.loading = true;
        },
        signInSuccess: (state,action) =>{
            state.currentUser = action.payload;
            state.loading =false;
            state.error = null;
        },
        signInFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteuserfailure: (state, action) => {
            state.error = action.payload;
            state.loading =false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutuserfailure: (state, action) => {
            state.error = action.payload;
            state.loading =false;
        }
    },
});
export const{ signInStart, signInSuccess, signInFailure, 
    updateUserFailure, updateUserSuccess, updateUserStart,
    deleteUserStart, deleteuserfailure, deleteUserSuccess,
    signOutUserStart,signOutUserSuccess,signOutuserfailure,
} = userSlice.actions;
export default userSlice.reducer;