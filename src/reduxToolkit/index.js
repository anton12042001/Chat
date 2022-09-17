import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import dialogsReducer from './slices/dialogsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        dialogs:dialogsReducer
    }

})