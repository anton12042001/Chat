import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../../reduxToolkit/slices/userSlice";
import {useNavigate} from "react-router-dom";
import {removeDialogs} from "../../../reduxToolkit/slices/dialogsSlice";

const CurrentUser = () => {

    const {email} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const Logout = () => {
        dispatch(removeUser())
        dispatch(removeDialogs())
    }

    const redirectToLogin = () => {
        navigate('/authorization')
    }

    return (
        <div>
            {email ? <button onClick={Logout}>Logout {email}</button> : <button onClick={redirectToLogin} >Войти</button>}
        </div>
    );
};

export default CurrentUser;