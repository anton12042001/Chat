import React, {useEffect} from 'react';
import Navbar from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import {createDialogAPI, NavbarDialogsObserverAPI} from "../../api/dialogsAPI";
import cl from './Navbar.module.css'
import NavbarNavigate from "./NavbarNavigate/NavbarNavigate";
import NewDialogsForm from "./NewDialogsForm/NewDialogsForm";
import {useState} from "react";


const NavbarContainer = () => {
    const {id, email} = useSelector(state => state.user)
    const {dialogs} = useSelector(state => state.dialogs)
    const {dialogsForShow, currentDialogs} = useSelector(state => state.showDialogs)
    const dispatch = useDispatch()
    const [newDialogs, setNewDialogs] = useState(false)
    const [privateDialogs, setPrivateDialogs] = useState(false)

    useEffect(() => {
        NavbarDialogsObserverAPI(dialogs, id, dispatch, dialogsForShow)
    }, [dialogs])


    const setNewDialogsDB = (data, privateDialogs) => {
        createNewDialogs(data, privateDialogs)
        setNewDialogs(false)
    }


    const createNewDialogs = async ({dialogsName, uidDialogs}, privateDialogs) => {
        await createDialogAPI(dialogsName, uidDialogs, dispatch, id, dialogs, privateDialogs)
    }

    if (email) {
        return (
            <div className={cl.navbarWrapper}>
                <NavbarNavigate currentDialogs={currentDialogs}/>
                <div className={cl.navbarContainer}>
                    <Navbar setNewDialogs={setNewDialogs}/>
                </div>

                {newDialogs &&
                    <div onClick={() => setNewDialogs(false)} className={cl.popapDialogsForm}>
                        <NewDialogsForm setPrivateDialogs={setPrivateDialogs} privateDialogs={privateDialogs}
                                        setNewDialogsDB={setNewDialogsDB}/>
                    </div>}
            </div>
        );
    }

};

export default NavbarContainer;