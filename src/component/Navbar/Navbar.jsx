import React, {useState} from 'react';
import cl from './Navbar.module.css'
import {useSelector} from "react-redux";
import NavbarDialogsList from "./NavbarDialogsList";
import {useNavigate} from "react-router-dom";
import NewDialogsForm from "./NewDialogsForm/NewDialogsForm";

const Navbar = (props) => {

    const [newDialogs,setNewDialogs] = useState(false)
    const [privateDialogs,setPrivateDialogs] = useState(false)
    const {dialogsForShow} = useSelector(state => state.showDialogs)
    const navigate = useNavigate()

    const setNewDialogsDB = (data,privateDialogs) => {
        props.createNewDialogs(data,privateDialogs)
        setNewDialogs(false)
    }

    return (
        <div>
            <div className={cl.navbar}>
                <div className={cl.buttonHome} >
                    <button onClick={() => navigate('/home')}>Главная</button>
                </div>
                <div>Список диалогов</div>
                <button onClick={() => setNewDialogs(true)}>Создать новый диалог</button>
                <div className={cl.dialogsList} >
                    {dialogsForShow.map(d =>
                        <NavbarDialogsList dialogsName={d.info.dialogsName} id={d.id} key={d.id}  />
                    )}
                </div>
            </div>

            {newDialogs &&
                <div onClick={() => setNewDialogs(false)} className={cl.popapDialogsForm}>
                    <NewDialogsForm setPrivateDialogs={setPrivateDialogs} privateDialogs={privateDialogs} setNewDialogsDB={setNewDialogsDB}/>
                </div>}

        </div>
    );
};

export default Navbar;