import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    dialogsForShow: [],

}


const showDialogs = createSlice({
    name: 'showDialogs',
    initialState,
    reducers: {
        setDialogsForShow(state, action) {
            state.dialogsForShow.push(action.payload)
        },
        removeDialogsList(state, action) {
            state.dialogsForShow = []
        }
    },
})
export const {removeDialogsList, setDialogsForShow,} = showDialogs.actions

export default showDialogs.reducer