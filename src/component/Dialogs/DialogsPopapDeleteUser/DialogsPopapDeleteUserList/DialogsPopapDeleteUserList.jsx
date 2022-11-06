import React, {useState} from 'react';
import cl from './DialogsPopapDeleteUserList.module.css'

const DialogsPopapDeleteUserList = ({deleteUserFromDialogParams,displayName,id}) => {


    const [itemActive,setItemActive] = useState(false)


    const deleteUserId = (id) => {
        deleteUserFromDialogParams(id)
    }

    return (
        <div>
            <div
            onMouseOut={() => setItemActive(false)}
                onMouseOver={() => setItemActive(true)}
            onClick={() => deleteUserId(id)}
                 className={(itemActive) ? cl.userInfoDisplayNameActive : cl.userInfoDisplayName} >
                {displayName}
            </div>
        </div>
    );
};

export default DialogsPopapDeleteUserList;