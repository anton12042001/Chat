import React from 'react';
import cl from './ChangePassword.module.css'

const ChangePassword = (props) => {
    return (
        <div>
            <button className={cl.changePasswordButton}  onClick={props.updatePassword} >Сменить пароль</button>
        </div>
    );
};

export default ChangePassword;