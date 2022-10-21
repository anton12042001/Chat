import React from 'react';
import NewDialogsFormPrivate from "./NewDialogsFormPrivate/NewDialogsFormPrivate";
import NewDialogsFormPublic from "./NewDialogsFormPublic/NewDialogsFormPublic";
import cl from './NewDialogsForm.module.css'

const NewDialogsForm = ({setPrivateDialogs,privateDialogs,setNewDialogsDB}) => {
    return (
        <div onClick={(e) => e.stopPropagation()}  className={cl.containerForm} >
            {privateDialogs
                ? <button onClick={() => setPrivateDialogs(false)} >Создайте публичный диалог</button>
                : <button onClick={() => setPrivateDialogs(true)} >Создайте приватный диалог</button> }
            {privateDialogs ? <NewDialogsFormPrivate/> : <NewDialogsFormPublic setNewDialogsDB={setNewDialogsDB}/> }
        </div>
    );
};

export default NewDialogsForm;