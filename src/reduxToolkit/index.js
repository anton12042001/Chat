import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import dialogsReducer from './slices/dialogsIdSlice'
import showDialogsReducer from './slices/showDialogs'

export const store = configureStore({
    reducer: {
        user: userReducer,
        dialogs:dialogsReducer,
        showDialogs:showDialogsReducer
    }

})