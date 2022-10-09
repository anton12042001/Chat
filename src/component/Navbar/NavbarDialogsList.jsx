import React from 'react';
import {useNavigate} from "react-router-dom";

const NavbarDialogsList = ({dialogsName, id}) => {

    const navigate = useNavigate()

    const switchToDialog = () => {
        navigate(`/dialogs/${id}`)
    }

    return (
        <div>
            <button onClick={switchToDialog}>{dialogsName}</button>
        </div>
    );
};

export default NavbarDialogsList;