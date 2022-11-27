import React from 'react';
import cl from './PopapCurrentUser.module.css'
import CurrentUser from "./CurrentUser/CurrentUser";
import PersonalCubnetContainer from "../PersonalCubnet/PersonalCubnetContainer";

const PopapCurrentUser = () => {
    return (
        <div onClick={(e) => e.stopPropagation()} className={cl.headerBlock} >
            <div className={cl.titlePage} >Настройки</div>
           <CurrentUser/>
            <PersonalCubnetContainer/>
        </div>
    );
};

export default PopapCurrentUser;