import React, {useState} from 'react';
import cl from './PersonalCubnet.module.css'
import ChangeFullName from "./ChangeFullName/ChangeFullName";
import ChangeFullNameContainer from "./ChangeFullName/ChangeFullNameContainer";
import ChangeEmailContainer from "./ChangeEmail/ChangeEmailContainer";

const PersonalCubnet = ({email,id,displayName,photoURL}) => {




    return (
        <div className={cl.containerPersonalCubnet} >
            <div className={cl.photoURL}>
                {photoURL ? <div>Ваша фотография: <img src={photoURL} alt=""/></div> :
                <button>Установить фотографию</button>}
            </div>
            <ChangeFullNameContainer id={id} displayName={displayName}/>
            <ChangeEmailContainer email={email} />
            <div className={cl.id} >Ваш ID: <span className={cl.idMeaning} >{id}</span></div>
            <div className={cl.infoId} >Зачем нужен id?</div>
        </div>
    );
};

export default PersonalCubnet;