import React from 'react';
import FormAuthLogin from "../FormAuthLogin";
import iconAuthPopap from '../../../img/auth/authIconPopap.svg'
import cl from './Login.module.css'

const Login = (props) => {

    const loginDB = (email, password) => {
        props.handleLogin(email, password)
    }


    return (
        <div className={cl.signInContainer} >
            <div className={cl.signInTitle} >
                <div>Вход</div>
                <div><img src={iconAuthPopap}/></div>
            </div>
            <FormAuthLogin loginDB={loginDB}/>
        </div>
    );
};

export default Login;