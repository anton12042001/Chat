import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages:[],
    lastMessages:null

}



const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages(state,action) {
            debugger
            state.messages = action.payload
        },
        additionalMessages(state,action){
            debugger
            state.messages.unshift(action.payload)
        },
        setLastMessages(state,action) {
            debugger
            state.lastMessages = action.payload
        },
        removeMessages(state,action){
            state.messages = null
        }
    },
})
export const {setMessages,setLastMessages,additionalMessages,removeMessages} = messagesSlice.actions

export default  messagesSlice.reducer