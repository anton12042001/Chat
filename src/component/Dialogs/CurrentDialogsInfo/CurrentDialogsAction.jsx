import React from 'react';
import cl from './CurrentDialogsInfo.module.css'
import addUserButtonIcon from '../../../img/dialogs/addUserButton.svg'
import DialogsAddUserPopap from "../DialogsAddUserPopap/DialogsAddUserPopap";

const CurrentDialogsAction = ({visiblePopap,setVisiblePopap,addUserToDialogs,userFound,userAdded,visiblePopapAddUser,privateDialog,exitUserFromDialogs,setPopapDeleteUser,id, currentDialogs}) => {



    return (
        <div className={cl.dialogsAction}>
            <div className={cl.countUsers} >Участников в беседе: {currentDialogs.info.users.length}</div>
            <div className={cl.roleUser} >Ваша роль: {(id === currentDialogs.info.admin) ? <span>Администратор</span> :
                <span>Пользователь</span>}</div>
            {!privateDialog && <button className={cl.addUsersButton} onClick={visiblePopapAddUser}>
                <img src={addUserButtonIcon}/> Добавить пользователя в чат
            </button>}


            <div className={cl.addUserToChat}>
                {(visiblePopap) && <DialogsAddUserPopap
                    userAdded={userAdded}
                    userFound={userFound}
                    addUserToDialogs={addUserToDialogs}
                    setVisiblePopap={setVisiblePopap}/>}
            </div>



            {(id === currentDialogs.info.admin) &&
                <button onClick={() => setPopapDeleteUser(true)}>Исключить из беседы...</button>}



            <button onClick={() => exitUserFromDialogs(id)} >Покинуть беседу</button>
        </div>
    );
};

export default CurrentDialogsAction;