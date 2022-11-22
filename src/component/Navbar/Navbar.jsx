import React from 'react';
import cl from './Navbar.module.css'
import {useSelector} from "react-redux";
import NavbarDialogsList from "./NavbarDialogsList";
import createDialogsIcon from '../../img/createNewDialogs/createNewDialogs.svg'

const Navbar = ({setNewDialogs}) => {


    const {dialogsForShow} = useSelector(state => state.showDialogs)


    return (
        <div className={cl.navbarBlockDialogs} >
            <div className={cl.titleBlockDialogs} >Беседы</div>
            <div className={cl.dialogueManagement}>
                <div className={cl.dialogsList}>
                    {dialogsForShow.map(d =>
                        <NavbarDialogsList dialogsName={d.info.dialogsName} id={d.id} key={d.id}/>
                    )}
                </div>
                <div className={cl.createNewDialogsButton} >
                    <button onClick={() => setNewDialogs(true)}>
                        <div className={cl.createNewDialogsButtonBody} >
                            <span>Создать беседу</span>
                            <img src={createDialogsIcon} alt=""/>
                        </div>
                    </button>
                </div>




            </div>
        </div>
    );
};

export default Navbar;