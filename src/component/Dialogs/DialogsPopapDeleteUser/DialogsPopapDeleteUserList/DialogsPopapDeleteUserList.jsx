import React, {useState} from 'react';
import cl from './DialogsPopapDeleteUserList.module.css'

const DialogsPopapDeleteUserList = ({deleteUserFromDialogParams,userInfo}) => {

    const [itemActive,setItemActive] = useState(false)


    const deleteUserId = (id) => {
        deleteUserFromDialogParams(id)
    }

    return (
        <div>
            <div
            onMouseOut={() => setItemActive(false)}
                onMouseOver={() => setItemActive(true)}
            onClick={() => deleteUserId(userInfo.id)}
                 className={(itemActive) ? cl.userInfoDisplayNameActive : cl.userInfoDisplayName} >
                {userInfo.displayName}
            </div>
        </div>
    );
};

export default DialogsPopapDeleteUserList;