import React from 'react';
import FormAuthRegister from "../FormAuthRegister";

const Register = (props) => {

    const signUpDB = (email, password) => {
        props.handleRegister(email, password)
    }


    return (
        <div>
            Зарегистрироваться
            <FormAuthRegister email={props.email} signUpDB={signUpDB}/>
        </div>
    );
};

export default Register;