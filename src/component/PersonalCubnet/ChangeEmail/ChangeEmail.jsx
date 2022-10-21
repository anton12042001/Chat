import React, {useState} from 'react';
import ChangeEmailInput from "./ChangeEmailInput/ChangeEmailInput";

const ChangeEmail = ({updateMail,email}) => {
    const [editModeEmail, setEditModeEmail] = useState(false)

    const changeEmail = (data) => {
        debugger
        setEditModeEmail(false)
        updateMail(data)
    }


    return (
        <div>
            {editModeEmail === true ?
                <ChangeEmailInput changeEmail={changeEmail} setEditModeEmail={setEditModeEmail}/> :
                <div>Ваша почта: {email}</div>}
            {!editModeEmail && <button onClick={() => setEditModeEmail(true)}>Сменить почту</button>}

        </div>
    );
};

export default ChangeEmail;