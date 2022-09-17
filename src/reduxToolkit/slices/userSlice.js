import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    id: null,
    token: null,
}



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state,action) {
            state.email = action.payload.email
            state.id = action.payload.id
            state.token = action.payload.token
        },
        removeUser(state,action) {
            state.email = null
            state.id = null
            state.token = null

        },
    },
})
export const {setUser,removeUser,} = userSlice.actions

export default  userSlice.reducer