import React from 'react';
import cl from '../Dialogs.module.css'
import {useSelector} from "react-redux";
import DialogsPopapDeleteUserList from "./DialogsPopapDeleteUserList/DialogsPopapDeleteUserList";

const DialogsPopapDeleteUser = ({deleteUserFromDialogParams}) => {
    const {currentDialogsUserInfo} = useSelector(state => state.showDialogs)
    console.log(currentDialogsUserInfo)



    return (
        <div onClick={(e) => e.stopPropagation()} className={cl.deleteUserWrapper} >
            <div className={cl.deleteUser}>
                {currentDialogsUserInfo.map(u =>  <DialogsPopapDeleteUserList deleteUserFromDialogParams={deleteUserFromDialogParams} id={u.id} displayName={u.displayName} />)}
            </div>
        </div>
    );
};

export default DialogsPopapDeleteUser;