import React from 'react';
import CurrentDialogsInfo from "./CurrentDialogsInfo";


const CurrentDialogsInfoContainer = ({exitUserFromDialogs,setPopapDeleteUser}) => {

    return (
        <div>
            <CurrentDialogsInfo exitUserFromDialogs={exitUserFromDialogs} setPopapDeleteUser={setPopapDeleteUser}/>
        </div>
    );
};

export default CurrentDialogsInfoContainer;