import React, {useState} from 'react';
import ChangeEmailInput from "./ChangeEmailInput/ChangeEmailInput";
import cl from './ChangeEmail.module.css'

const ChangeEmail = ({updateMail,email}) => {
    const [editModeEmail, setEditModeEmail] = useState(false)

    const changeEmail = (data) => {
        debugger
        setEditModeEmail(false)
        updateMail(data)
    }


    return (
        <div className={cl.changeEmailContainer} >
            {editModeEmail === true ?
                <ChangeEmailInput changeEmail={changeEmail} setEditModeEmail={setEditModeEmail}/> :
                <div className={cl.changeEmailTitle} >Ваша почта: {email}</div>}
            {!editModeEmail && <button className={cl.buttonChangeEmail}  onClick={() => setEditModeEmail(true)}>Сменить почту</button>}

        </div>
    );
};

export default ChangeEmail;