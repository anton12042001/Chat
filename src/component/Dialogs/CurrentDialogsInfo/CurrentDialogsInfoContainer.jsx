import React from 'react';
import CurrentDialogsInfo from "./CurrentDialogsInfo";
import cl from './CurrentDialogsInfo.module.css'


const CurrentDialogsInfoContainer = ({exitUserFromDialogs,setPopapDeleteUser}) => {

    return (
        <div className={cl.currentDialogsHeaderBody} >
            <CurrentDialogsInfo exitUserFromDialogs={exitUserFromDialogs} setPopapDeleteUser={setPopapDeleteUser}/>
            <div className={cl.borderHeaderDialogs}></div>
        </div>
    );
};

export default CurrentDialogsInfoContainer;