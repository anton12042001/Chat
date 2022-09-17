import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    dialogs:null
}



const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        setDialogs(state,action) {
            state.dialogs = action.payload
        },
        removeDialogs(state,action){
            state.dialogs = null
        }
    },
})
export const {setDialogs,removeDialogs} = dialogsSlice.actions

export default  dialogsSlice.reducer