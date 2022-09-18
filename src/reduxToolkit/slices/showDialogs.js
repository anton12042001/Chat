import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    admin: null,
    dialogsName: null,
    users: null,
    dialogsId: null,
}


const showDialogs = createSlice({
    name: 'showDialogs',
    initialState,
    reducers: {
        setDialogsForShow(state, action) {
            debugger
            state.admin = action.payload.admin
            state.dialogsName = action.payload.dialogsName
            state.users = action.payload.users
        },
        setDialogsIdForShow(state, action) {
            debugger
            state.dialogsId = action.payload
        },
        removeDialogs(state, action) {

        }
    },
})
export const {removeDialogs, setDialogsForShow,setDialogsIdForShow} = showDialogs.actions

export default showDialogs.reducer