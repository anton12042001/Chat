import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import {createDialogAPI, NavbarDialogsObserverAPI} from "../../api/dialogsAPI";
import cl from './Navbar.module.css'
import PopapCurrentUser from "../PopapCurrentUser/PopapCurrentUser";
import {useLocation, useNavigate, useParams} from "react-router-dom";




// import setting from '/src/img/imgNavigate/setting.svg'
// import settingActive from '/src/img/imgNavigate/settingActive.svg'
import home from '../../img/imgNavigate/home.svg'
import homeActive from '../../img/imgNavigate/homeActive.svg'
import chat from '../../img/imgNavigate/chat.svg'
import chatActive from '../../img/imgNavigate/chatActive.svg'



const NavbarContainer = () => {

    const {id, email} = useSelector(state => state.user)
    const {dialogs} = useSelector(state => state.dialogs)
    const {dialogsForShow,currentDialogs} = useSelector(state => state.showDialogs)
    const dispatch = useDispatch()
    const [showSetting, setShowSetting] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location)

    useEffect(() => {
        NavbarDialogsObserverAPI(dialogs, id, dispatch, dialogsForShow)
    }, [dialogs])


    const createNewDialogs = async ({dialogsName, uidDialogs}, privateDialogs) => {
        await createDialogAPI(dialogsName, uidDialogs, dispatch, id, dialogs, privateDialogs)
    }

    if (email) {
        return (
            <div className={cl.navbarWrapper}>
                <div className={cl.navigate}>
                    <div onClick={() => navigate('/home')} className={(location.pathname === '/home') ? cl.homeActive : cl.home}>
                        <img src={(location.pathname === '/home') ? homeActive : home} alt=""/>
                    </div>
                    <div className={(location.pathname === `/dialogs/${currentDialogs.id}`) ? cl.chatActive : cl.chat}>
                        <img src={(location.pathname === '/dialogs/') ? chatActive : chat} alt=""/>
                    </div>
                    <img src="" alt=""/>
                </div>
                <div className={cl.navbarContainer}>
                    <div className={cl.settingUser}>
                        <div>
                            <button onClick={() => setShowSetting(true)}>Настройки</button>
                        </div>
                        {(showSetting) &&
                            <div onClick={() => setShowSetting(false)} className={cl.popapCurrentUserContainer}>
                                <PopapCurrentUser/></div>}
                    </div>
                    <Navbar createNewDialogs={createNewDialogs}/>
                </div>
            </div>
        );
    }

};

export default NavbarContainer;