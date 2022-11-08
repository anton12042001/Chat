import React, {useState} from 'react';
import cl from './DialogsPopapDeleteUserList.module.css'
import {useSelector} from "react-redux";

const DialogsPopapDeleteUserList = ({deleteUserFromDialogParams, displayName, idUser}) => {



    const {id} = useSelector(state => state.user)
    const [itemActive, setItemActive] = useState(false)


    const deleteUserId = (id) => {
        deleteUserFromDialogParams(id)
    }

    return (
        <div>
            <div
                onMouseOut={() => setItemActive(false)}
                onMouseOver={() => setItemActive(true)}
                onClick={() => deleteUserId(id)}
                className={(itemActive) ? cl.userInfoDisplayNameActive : cl.userInfoDisplayName}>
                <div className={cl.containerItems} >
                    <div>{displayName}</div> {(idUser === id) && <div className={cl.itemsAdmin} >Это вы</div>}
                </div>
            </div>
        </div>
    );
};

export default DialogsPopapDeleteUserList;