import React from 'react';
import Authorization from "./Authorization";
import cl from './Authorization.module.css'

const AuthorizationContainer = () => {
    return (
        <div className={cl.authorizationWrapper} >
            <Authorization/>
        </div>
    );
};

export default AuthorizationContainer;