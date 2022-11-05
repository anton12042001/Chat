import React, {useEffect} from 'react';
import DialogsPopapDeleteUser from "./DialogsPopapDeleteUser";
import {useSelector} from "react-redux";

const DialogsPopapDeleteUserContainer = ({deleteUserFromDialogParams,getUserInfoCurrentDialog}) => {
    const {currentDialogs, currentDialogsUserInfo} = useSelector(state => state.showDialogs)


    useEffect(() => {
        if (currentDialogsUserInfo === 0) {
            getUserInfoCurrentDialog(currentDialogs.info.users)
        }
    }, [])


    return (
        <div>
            <DialogsPopapDeleteUser deleteUserFromDialogParams={deleteUserFromDialogParams} />
        </div>
    );
};

export default DialogsPopapDeleteUserContainer;