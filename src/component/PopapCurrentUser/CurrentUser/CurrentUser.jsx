import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../../reduxToolkit/slices/userSlice";
import {useNavigate} from "react-router-dom";
import {removeDialogs} from "../../../reduxToolkit/slices/dialogsIdSlice";
import {removeDialogsList} from "../../../reduxToolkit/slices/showDialogs";
import {removeMessages} from "../../../reduxToolkit/slices/messagesSlice";
import cl from './CurrentUser.module.css'


const CurrentUser = () => {

    const {email} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const Logout = () => {
        navigate('/authorization')
        dispatch(removeUser())
        dispatch(removeDialogs())
        dispatch(removeDialogsList())
        dispatch(removeMessages())
    }



    const redirectToLogin = () => {
        navigate('/authorization')
    }

    return (
        <div  >
            {email ? <button className={cl.logoutButton}  onClick={Logout}>Выйти из аккаунта {email}</button> : <button onClick={redirectToLogin} >Войти</button>}
        </div>
    );
};

export default CurrentUser;