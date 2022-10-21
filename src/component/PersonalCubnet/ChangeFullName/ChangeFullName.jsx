import React, {useState} from 'react';
import ChangeFullNameForm from "./ChangeFullNameForm";

const ChangeFullName = ({changeName,displayName}) => {
    const [editName,setEditName] = useState(false)

    const changeFullNameUsers = (data) => {
        debugger
        changeName(data)
    }




    return (
        <div>
            <div>Ваше имя: {(editName ? <ChangeFullNameForm changeFullNameUsers={changeFullNameUsers} setEditName={setEditName} /> : <span>{displayName}</span>)}</div>
            {(!editName) && <button onClick={() => setEditName(true)} >Сменить имя</button>}
        </div>
    );
};

export default ChangeFullName;