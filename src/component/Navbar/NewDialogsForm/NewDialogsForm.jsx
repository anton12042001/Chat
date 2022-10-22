import React from 'react';
import NewDialogsFormPrivate from "./NewDialogsFormPrivate/NewDialogsFormPrivate";
import NewDialogsFormPublic from "./NewDialogsFormPublic/NewDialogsFormPublic";
import cl from './NewDialogsForm.module.css'

const NewDialogsForm = ({setPrivateDialogs,privateDialogs,setNewDialogsDB}) => {

    const createNewDialogsDB = (data,privateDialogs) => {
        setNewDialogsDB(data,privateDialogs)
    }



    return (
        <div onClick={(e) => e.stopPropagation()}  className={cl.containerForm} >
            {privateDialogs
                ? <button onClick={() => setPrivateDialogs(false)} >Создайте публичный диалог</button>
                : <button onClick={() => setPrivateDialogs(true)} >Создайте приватный диалог</button> }
            {privateDialogs ? <NewDialogsFormPrivate createNewDialogsDB={createNewDialogsDB} /> : <NewDialogsFormPublic createNewDialogsDB={createNewDialogsDB}/> }
        </div>
    );
};

export default NewDialogsForm;