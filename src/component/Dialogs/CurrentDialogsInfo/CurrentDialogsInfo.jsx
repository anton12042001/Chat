import React, {useState} from 'react';
import {useSelector} from "react-redux";
import cl from './CurrentDialogsInfo.module.css'
import CurrentDialogsAction from "./CurrentDialogsAction";

const CurrentDialogsInfo = ({exitUserFromDialogs, setPopapDeleteUser}) => {

    const {currentDialogs} = useSelector(state => state.showDialogs)
    const [actionActive, setActionActive] = useState(false)

    const {id} = useSelector(state => state.user)

    return (
        <div className={cl.currentDialogsContainer}>
            <div className={cl.dialogsName}>{currentDialogs.info.dialogsName}</div>
            {actionActive &&
                <CurrentDialogsAction
                    exitUserFromDialogs={exitUserFromDialogs}
                    setPopapDeleteUser={setPopapDeleteUser}
                    id={id}
                    currentDialogs={currentDialogs}
                />
            }
            <div style={(actionActive) ? {flexDirection:"column"} : {flexDirection:"inherit"}} className={cl.moreItems}
                 onClick={() => setActionActive(!actionActive)}>
                <div className={cl.moreItem}></div>
                <div className={cl.moreItem}></div>
                <div className={cl.moreItem}></div>
            </div>
        </div>
    );
};

export default CurrentDialogsInfo;