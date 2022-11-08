import React, {useEffect} from 'react';
import DialogsPopapDeleteUser from "./DialogsPopapDeleteUser";
import {useSelector} from "react-redux";

const DialogsPopapDeleteUserContainer = ({deleteUserFromDialogParams, getUserInfoCurrentDialog}) => {
    const {currentDialogs} = useSelector(state => state.showDialogs)

    useEffect(() => {
        getUserInfoCurrentDialog(currentDialogs.info.users)
    }, [currentDialogs])


    return (
        <div>
            <DialogsPopapDeleteUser deleteUserFromDialogParams={deleteUserFromDialogParams}/>
        </div>
    );
};

export default DialogsPopapDeleteUserContainer;