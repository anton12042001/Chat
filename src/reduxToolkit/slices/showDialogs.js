import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    dialogsForShow: [],
    currentDialogs:{},
    currentDialogsUserInfo:[]

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
        setCurrentDialogsUserInfo(state,action){
            state.currentDialogsUserInfo.push(action.payload)
        },
        removeDialogsList(state, action) {
            state.dialogsForShow = []
            state.currentDialogs = {}
            state.currentDialogsUserInfo = []
        }
    },
})
export const {removeDialogsList, setDialogsForShow,setCurrentDialogs,setCurrentDialogsUserInfo} = showDialogs.actions

export default showDialogs.reducer