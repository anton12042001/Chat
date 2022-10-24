import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    dialogsForShow: [],
    currentDialogs:{}

}


const showDialogs = createSlice({
    name: 'showDialogs',
    initialState,
    reducers: {
        setDialogsForShow(state, action) {
            state.dialogsForShow.push(action.payload)
        },
        setCurrentDialogs(state,action){
            state.currentDialogs = action.payload
        },
        removeDialogsList(state, action) {
            state.dialogsForShow = []
        }
    },
})
export const {removeDialogsList, setDialogsForShow,setCurrentDialogs} = showDialogs.actions

export default showDialogs.reducer