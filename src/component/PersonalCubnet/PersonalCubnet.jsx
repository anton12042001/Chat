import React, {useState} from 'react';
import cl from './PersonalCubnet.module.css'
import ChangeFullNameContainer from "./ChangeFullName/ChangeFullNameContainer";
import ChangeEmailContainer from "./ChangeEmail/ChangeEmailContainer";
import ChangePasswordContainer from "./ChangePassword/ChangePasswordContainer";
import idInfoIcom from '../../img/setting/idInfoIcon.svg'

const PersonalCubnet = ({email,id,displayName,photoURL}) => {

    const [infoId,setInfoId] = useState(false)


    return (
        <div className={cl.containerPersonalCubnet} >
            <ChangeEmailContainer email={email} />
            <ChangeFullNameContainer id={id} displayName={displayName}/>
            <div className={cl.id} >
                Ваш ID: <span className={cl.idMeaning} >{id}</span>
            </div>
                <div onMouseOut={() => setInfoId(false)} onMouseOver={() => setInfoId(true)} className={cl.infoId}>
                    <div className={cl.idInfo} >Зачем нужен id?</div>
                    {infoId && <div className={cl.popapInfoId}>
                        <div className={cl.imgSendId} ><img src={idInfoIcom}/></div>
                        <div>Передайте этот ID  другу, с которым хотите начать беседу </div>
                    </div>}
                </div>
            <ChangePasswordContainer/>
        </div>
    );
};

export default PersonalCubnet;