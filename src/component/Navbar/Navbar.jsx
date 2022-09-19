import React, {useState} from 'react';
import cl from './Navbar.module.css'
import NewDialogsForm from "./NewDialogsForm/NewDialogsForm";
import {useSelector} from "react-redux";
import NavbarDialogsList from "./NavbarDialogsList";

const Navbar = (props) => {

    const [newDialogs,setNewDialogs] = useState(false)
    const {dialogsForShow} = useSelector(state => state.showDialogs)

    const setNewDialogsDB = (data) => {
        props.createNewDialogs(data)
        setNewDialogs(false)
    }

    return (
        <div className={cl.navbar}>
            <div>Список диалогов</div>
            <button onClick={() => setNewDialogs(true)}>Создать новый диалог</button>
            {newDialogs && <NewDialogsForm setNewDialogsDB={setNewDialogsDB} /> }
            <div className={cl.dialogsList} >
                {dialogsForShow.map(d =>
                    <NavbarDialogsList dialogsName={d.info.dialogsName} id={d.id}  />
                )}
            </div>

        </div>
    );
};

export default Navbar;