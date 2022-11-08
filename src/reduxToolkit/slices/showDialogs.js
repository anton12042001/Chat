import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    dialogsForShow: [],
    currentDialogs:null,
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
            debugger
            state.currentDialogs = action.payload
        },
        setCurrentDialogsUserInfo(state,action){
            state.currentDialogsUserInfo.push(action.payload)
        },
        removeDialogsForShow(state,action){
          state.dialogsForShow = []
        },
        removeCurrentDialogs(state){
            state.currentDialogs = null
        },
        removeCurrentDialogsUserInfo(state){
            state.currentDialogsUserInfo = []
        },
        removeDialogsList(state, action) {
            state.dialogsForShow = []
            state.currentDialogs = null
            state.currentDialogsUserInfo = []
        }
    },
})
export const {removeDialogsList, setDialogsForShow,setCurrentDialogs,
    setCurrentDialogsUserInfo,removeCurrentDialogs,removeCurrentDialogsUserInfo,removeDialogsForShow} = showDialogs.actions

export default showDialogs.reducer