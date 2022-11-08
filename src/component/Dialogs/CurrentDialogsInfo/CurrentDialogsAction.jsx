import React from 'react';
import cl from './CurrentDialogsInfo.module.css'
import {useSelector} from "react-redux";

const CurrentDialogsAction = ({exitUserFromDialogs,setPopapDeleteUser,id, currentDialogs}) => {



    return (
        <div className={cl.dialogsAction}>
            <div>Участников в беседе: {currentDialogs.info.users.length}</div>
            <div>Ваша роль: {(id === currentDialogs.info.admin) ? <span>Администратор</span> :
                <span>Пользователь</span>}</div>
            {(id === currentDialogs.info.admin) &&
                <button onClick={() => setPopapDeleteUser(true)}>Исключить из беседы...</button>}



            <button onClick={() => exitUserFromDialogs(id)} >Покинуть беседу</button>
        </div>
    );
};

export default CurrentDialogsAction;