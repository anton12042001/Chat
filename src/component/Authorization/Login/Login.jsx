import React from 'react';
import FormAuthLogin from "../FormAuthLogin";


const Login = (props) => {

    const loginDB = (email, password) => {
        props.handleLogin(email, password)
    }


    return (
        <div>
            Войти в систему
            <FormAuthLogin loginDB={loginDB}/>
        </div>
    );
};

export default Login;