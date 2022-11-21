import React, {useState} from 'react';
import RegisterContainer from "./Register/RegisterContainer";
import LoginContainer from "./Login/LoginContainer";
import cl from './Authorization.module.css'
import iconAuth from '../../img/iconAuthorization.svg'

const Authorization = () => {
    const [isReguster, setIsRegister] = useState(null)

    const register = () => {
        setIsRegister(true)
    }
    const login = () => {
        setIsRegister(false)
    }

    return (
        <div className={cl.authorizationContainer} >
            <div className={cl.authIcon} ><img src={iconAuth}/></div>
            <div className={cl.authTitle} >Anton Online</div>
            {isReguster === true ? <RegisterContainer/> : (isReguster === false) && <LoginContainer/>}
            <button onClick={login} >Войти в систему</button>
            <button onClick={register} >Зарегистрироваться</button>
        </div>
    );
};

export default Authorization;