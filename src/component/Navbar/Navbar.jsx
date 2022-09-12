import React, {useState} from 'react';
import cl from './Navbar.module.css'
import NewDialogsForm from "./NewDialogsForm/NewDialogsForm";

const Navbar = (props) => {

    const [newDialogs,setNewDialogs] = useState(false)

    const setNewDialogsDB = (data) => {
        props.createNewDialogs(data)
        setNewDialogs(false)
    }




    return (
        <div className={cl.navbar}>
            <div>Список диалогов</div>
            <button onClick={() => setNewDialogs(true)}>Создать новый диалог</button>
            {newDialogs && <NewDialogsForm setNewDialogsDB={setNewDialogsDB} /> }
        </div>
    );
};

export default Navbar;