import React, {useState} from 'react';
import cl from './PersonalCubnet.module.css'
import ChangeFullNameContainer from "./ChangeFullName/ChangeFullNameContainer";
import ChangeEmailContainer from "./ChangeEmail/ChangeEmailContainer";
import ChangePasswordContainer from "./ChangePassword/ChangePasswordContainer";

const PersonalCubnet = ({email,id,displayName,photoURL}) => {

    const [infoId,setInfoId] = useState(false)


    return (
        <div className={cl.containerPersonalCubnet} >
            <div className={cl.photoURL}>
                {photoURL ? <div>Ваша фотография: <img src={photoURL} alt=""/></div> :
                <button>Установить фотографию</button>}
            </div>
            <ChangeFullNameContainer id={id} displayName={displayName}/>
            <ChangeEmailContainer email={email} />
            <div className={cl.id} >
                Ваш ID: <span className={cl.idMeaning} >{id}</span>
            </div>
                <div onMouseOut={() => setInfoId(false)} onMouseOver={() => setInfoId(true)} className={cl.infoId}>
                    Зачем нужен id?
                    {infoId && <div className={cl.popapInfoId}>Передайте этот id своему другу, с которым вы хотите начать приватную беседу</div>}
                </div>
            <ChangePasswordContainer/>
        </div>
    );
};

export default PersonalCubnet;