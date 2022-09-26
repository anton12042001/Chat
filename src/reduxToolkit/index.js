import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import dialogsReducer from './slices/dialogsIdSlice'
import showDialogsReducer from './slices/showDialogs'
import messagesReducer from './slices/messagesSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        dialogs:dialogsReducer,
        showDialogs:showDialogsReducer,
        messages: messagesReducer
    }

})