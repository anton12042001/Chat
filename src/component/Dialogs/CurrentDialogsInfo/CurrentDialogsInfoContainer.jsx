import React from 'react';
import CurrentDialogsInfo from "./CurrentDialogsInfo";
import cl from './CurrentDialogsInfo.module.css'


const CurrentDialogsInfoContainer = ({ visiblePopap,setVisiblePopap,addUserToDialogs,userFound,userAdded,visiblePopapAddUser,privateDialog,exitUserFromDialogs,setPopapDeleteUser}) => {

    return (
        <div className={cl.currentDialogsHeaderBody} >
            <CurrentDialogsInfo
                visiblePopap={visiblePopap}
                userAdded={userAdded}
                userFound={userFound}
                addUserToDialogs={addUserToDialogs}
                setVisiblePopap={setVisiblePopap}
                visiblePopapAddUser={visiblePopapAddUser}
                privateDialog={privateDialog}
                exitUserFromDialogs={exitUserFromDialogs}
                setPopapDeleteUser={setPopapDeleteUser}/>
            <div className={cl.borderHeaderDialogs}></div>
        </div>
    );
};

export default CurrentDialogsInfoContainer;