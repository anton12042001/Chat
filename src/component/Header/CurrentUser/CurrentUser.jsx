import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../../reduxToolkit/slices/userSlice";
import {useNavigate} from "react-router-dom";
import {removeDialogs} from "../../../reduxToolkit/slices/dialogsIdSlice";
import {removeDialogsList} from "../../../reduxToolkit/slices/showDialogs";
import {removeMessages} from "../../../reduxToolkit/slices/messagesSlice";


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

    const personalCubnet = () => {
        navigate('/personalCubnet')
    }


    const redirectToLogin = () => {
        navigate('/authorization')
    }

    return (
        <div  >
            {email ? <button onClick={Logout}>Logout {email}</button> : <button onClick={redirectToLogin} >Войти</button>}
            {email && <div><button onClick={personalCubnet} >Личный кабинет</button></div>}
        </div>
    );
};

export default CurrentUser;