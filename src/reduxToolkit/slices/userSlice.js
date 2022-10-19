import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    id: null,
    displayName:null,
    photoURL:null,
    token: null,
}



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state,action) {
            state.email = action.payload.email
            state.id = action.payload.id
            state.displayName = action.payload.displayName
            state.token = action.payload.token
        },
        changeNameUsers(state,action){
            debugger
            state.displayName = action.payload.displayName
        },
        removeUser(state,action) {
            state.email = null
            state.id = null
            state.displayName = null
            state.token = null

        },
    },
})
export const {setUser,removeUser,changeNameUsers} = userSlice.actions

export default  userSlice.reducer