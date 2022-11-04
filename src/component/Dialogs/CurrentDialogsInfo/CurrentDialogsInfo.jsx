import React, {useState} from 'react';
import {useSelector} from "react-redux";
import cl from './CurrentDialogsInfo.module.css'
import CurrentDialogsAction from "./CurrentDialogsAction";

const CurrentDialogsInfo = ({setPopapDeleteUser}) => {

    const {currentDialogs} = useSelector(state => state.showDialogs)
    const [actionActive,setActionActive] = useState(false)
    const {id} = useSelector(state => state.user)

    return (
        <div className={cl.currentDialogsContainer} >
            <div>{currentDialogs.info.dialogsName}</div>
            {actionActive && <CurrentDialogsAction setPopapDeleteUser={setPopapDeleteUser} id={id} currentDialogs={currentDialogs} />}
            <div onClick={() => setActionActive(!actionActive)} >
                Действия...
            </div>
        </div>
    );
};

export default CurrentDialogsInfo;