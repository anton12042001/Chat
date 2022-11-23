import React from 'react';
import cl from './NavbarNavigate.module.css'
import homeActive from "../../../img/imgNavigate/homeActive.svg";
import home from "../../../img/imgNavigate/home.svg";
import chatActive from "../../../img/imgNavigate/chatActive.svg";
import chat from "../../../img/imgNavigate/chat.svg";
import settingActive from "../../../img/imgNavigate/settingActive.svg";
import setting from "../../../img/imgNavigate/setting.svg";
import {useLocation, useNavigate} from "react-router-dom";


const NavbarNavigate = (currentDialogs) => {
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location)


    return (

        //todo переделать отображение значка сообщений
            <div className={cl.navigate}>
                <div onClick={() => navigate('/home')} className={(location.pathname === '/home') ? cl.homeActive : cl.home}>
                    <img src={(location.pathname === '/home') ? homeActive : home} alt=""/>
                </div>
                <div className={(currentDialogs) ? (location.pathname === `/dialogs/${currentDialogs.id}`) ? cl.chatActive : cl.chat : cl.chat}>
                    <img src={(location.pathname === `/dialogs/`) ? chatActive : chat} alt=""/>
                </div>

                <div onClick={() => navigate('/setting')} className={(location.pathname === '/setting') ? cl.settingActive : cl.setting} >
                    <img src={(location.pathname === '/setting') ? settingActive : setting} alt=""/>
                </div>
            </div>
    );
};

export default NavbarNavigate;