import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages:null,

}



const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages(state,action) {
            debugger
            state.messages = action.payload
        },
        removeMessages(state,action){
            state.messages = null
        }
    },
})
export const {setMessages,removeMessages,} = messagesSlice.actions

export default  messagesSlice.reducer