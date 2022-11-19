import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import {createDialogAPI, NavbarDialogsObserverAPI} from "../../api/dialogsAPI";
import cl from './Navbar.module.css'
import PopapCurrentUser from "../PopapCurrentUser/PopapCurrentUser";
import {useNavigate} from "react-router-dom";

const NavbarContainer = () => {

    const {id} = useSelector(state => state.user)
    const {dialogs} = useSelector(state => state.dialogs)
    const {dialogsForShow} = useSelector(state => state.showDialogs)
    const dispatch = useDispatch()
    const [showSetting, setShowSetting] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        NavbarDialogsObserverAPI(dialogs,id,dispatch,dialogsForShow)
    }, [dialogs])





    const createNewDialogs = async ({dialogsName,uidDialogs},privateDialogs) => {
        await createDialogAPI(dialogsName,uidDialogs, dispatch, id, dialogs,privateDialogs)
    }


    return (
        <div className={cl.navbarContainer} >
            <div className={cl.settingUser} >
                <div>
                    <button onClick={() => setShowSetting(true)}>Настройки</button>
                </div>
                <div className={cl.appName} onClick={() => navigate('/home')}>АнтонОнлайн</div>
                {(showSetting) && <div onClick={() => setShowSetting(false)} className={cl.popapCurrentUserContainer} ><PopapCurrentUser/></div>}
            </div>
            <Navbar createNewDialogs={createNewDialogs}/>
        </div>
    );
};

export default NavbarContainer;