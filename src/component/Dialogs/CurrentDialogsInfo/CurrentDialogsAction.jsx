import React from 'react';
import cl from './CurrentDialogsInfo.module.css'

const CurrentDialogsAction = ({exitUserFromDialogs,setPopapDeleteUser,id, currentDialogs}) => {



    return (
        <div className={cl.dialogsAction}>
            <div className={cl.countUsers} >Участников в беседе: {currentDialogs.info.users.length}</div>
            <div className={cl.roleUser} >Ваша роль: {(id === currentDialogs.info.admin) ? <span>Администратор</span> :
                <span>Пользователь</span>}</div>
            {(id === currentDialogs.info.admin) &&
                <button onClick={() => setPopapDeleteUser(true)}>Исключить из беседы...</button>}



            <button onClick={() => exitUserFromDialogs(id)} >Покинуть беседу</button>
        </div>
    );
};

export default CurrentDialogsAction;