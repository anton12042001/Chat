import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import cl from './Navbar.module.css'

const NavbarDialogsList = ({dialogsName, id}) => {
    const [mouseOver,setMouseOver] = useState(false)

    const navigate = useNavigate()

    const switchToDialog = () => {
        navigate(`/dialogs/${id}`)
    }

    return (
        <div className={(mouseOver) ? cl.itemDialogsActive : cl.itemDialogs} >
            <button onMouseOut={() => setMouseOver(false)}
                    onMouseOver={() => setMouseOver(true)}
                    onClick={switchToDialog}>{dialogsName}</button>
        </div>
    );
};

export default NavbarDialogsList;