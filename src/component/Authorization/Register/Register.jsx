import React from 'react';
import FormAuthRegister from "../FormAuthRegister";
import cl from './Register.module.css'
import iconAuthPopap from '../../../img/auth/authIconPopap.svg'

const Register = (props) => {

    const signUpDB = (email, password) => {
        props.handleRegister(email, password)
    }


    return (
        <div className={cl.signUpContainer}>
            <div className={cl.signUpTitle} >
                <div>Регистрация</div>
                <div>
                    <img src={iconAuthPopap}/>
                </div>
            </div>
            <FormAuthRegister email={props.email} signUpDB={signUpDB}/>
        </div>
    );
};

export default Register;