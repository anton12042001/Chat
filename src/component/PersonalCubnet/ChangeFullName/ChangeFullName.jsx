import React, {useState} from 'react';
import ChangeFullNameForm from "./ChangeFullNameForm";
import cl from './ChangeFullName.module.css'

const ChangeFullName = ({changeName,displayName}) => {
    const [editName,setEditName] = useState(false)

    const changeFullNameUsers = (data) => {
        debugger
        changeName(data)
    }




    return (
        <div>
            <div className={cl.displayName} >Ваше имя: {(editName ? <ChangeFullNameForm changeFullNameUsers={changeFullNameUsers} setEditName={setEditName} /> : <span>{displayName}</span>)}</div>
            <div className={cl.changeDisplayName} >Смена имени в разработке...</div>
        </div>
    );
};

export default ChangeFullName;

