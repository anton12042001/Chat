import React from 'react';
import cl from '../Dialogs.module.css'
import {useSelector} from "react-redux";
import DialogsPopapDeleteUserList from "./DialogsPopapDeleteUserList/DialogsPopapDeleteUserList";

const DialogsPopapDeleteUser = ({deleteUserFromDialogParams}) => {
    const {currentDialogsUserInfo} = useSelector(state => state.showDialogs)



    return (
        <div onClick={(e) => e.stopPropagation()} className={cl.deleteUserWrapper} >
            <div className={cl.deleteUser}>
                {currentDialogsUserInfo.map(u =>
                    <DialogsPopapDeleteUserList deleteUserFromDialogParams={deleteUserFromDialogParams}
                                                idUser={u.id} displayName={u.displayName} key={u.id} />)}
            </div>
        </div>
    );
};

export default DialogsPopapDeleteUser;