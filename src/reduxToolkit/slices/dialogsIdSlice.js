import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    dialogs:null,

}



const dialogsIdSlice = createSlice({
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
export const {setDialogs,removeDialogs,} = dialogsIdSlice.actions

export default  dialogsIdSlice.reducer