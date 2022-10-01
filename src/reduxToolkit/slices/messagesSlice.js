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
            state.messages = action.payload
        },
        additionalMessages(state,action){
            state.messages.unshift(action.payload)
        },
        setLastMessages(state,action) {
            state.lastMessages = action.payload
        },
        removeMessages(state,action){
            state.messages = null
        }
    },
})
export const {setMessages,setLastMessages,additionalMessages,removeMessages} = messagesSlice.actions

export default  messagesSlice.reducer