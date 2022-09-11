import React, {useState} from 'react';
import RegisterContainer from "./Register/RegisterContainer";
import LoginContainer from "./Login/LoginContainer";

const Authorization = () => {
    const [isReguster, setIsRegister] = useState(false)

    const register = () => {
        setIsRegister(true)
    }
    const login = () => {
        setIsRegister(false)
    }

    return (
        <div>
            {isReguster ? <RegisterContainer/> : <LoginContainer/>}
            <button onClick={login} >Войти в систему</button>
            <button onClick={register} >Зарегистрироваться</button>
        </div>
    );
};

export default Authorization;