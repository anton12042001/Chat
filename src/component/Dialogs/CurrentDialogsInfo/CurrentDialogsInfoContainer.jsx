import React from 'react';
import CurrentDialogsInfo from "./CurrentDialogsInfo";


const CurrentDialogsInfoContainer = ({setPopapDeleteUser}) => {

    return (
        <div>
            <CurrentDialogsInfo setPopapDeleteUser={setPopapDeleteUser}/>
        </div>
    );
};

export default CurrentDialogsInfoContainer;