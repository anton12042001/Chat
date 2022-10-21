import React from 'react';

const ChangePassword = (props) => {
    return (
        <div>
            <button onClick={props.updatePassword} >Сменить пароль</button>
        </div>
    );
};

export default ChangePassword;