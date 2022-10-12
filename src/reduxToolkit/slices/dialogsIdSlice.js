import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    dialogs:null,

}



const dialogsIdSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        setDialogs(state,action) {
            debugger
            state.dialogs = action.payload
        },
        removeDialogs(state,action){
            debugger
            state.dialogs = null
        }
    },
})
export const {setDialogs,removeDialogs,} = dialogsIdSlice.actions

export default  dialogsIdSlice.reducer