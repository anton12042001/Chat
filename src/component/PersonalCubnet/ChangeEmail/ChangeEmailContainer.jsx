import React, {useState} from 'react';
import ChangeEmail from "./ChangeEmail";
import cl from './ChangeEmail.module.css'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getAuth,updateEmail} from "firebase/auth";
import {reAuthAPI, sendMessagesAPI} from "../../../api/authAPI";
import {changeEmailUsers} from "../../../reduxToolkit/slices/userSlice";
import ChangePopapForm from "../ChangePopapForm/ChangePopapForm";


const ChangeEmailContainer = ({email}) => {
    const [authPopap, setAuthPopap] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = getAuth();


    const reauthorization = (data) => {
        reAuthAPI(data).then(() => {
            setAuthPopap(false)
        }).catch((error) => {
            console.log(error)
        });
    }


    const updateMail = (data) => {
        updateEmail(auth.currentUser, `${data.email}`).then(() => {
            alert("Почта успешно обновлена")
            dispatch(changeEmailUsers(data.email))
            sendMessagesAPI().then(r => {
                navigate('/mailVerification')
            })
        }).catch(() => {
            setAuthPopap(true)
        });
    }




    return (
        <div className={cl.emailContainer} >
            {authPopap && <div className={cl.reAuthPopap}> <ChangePopapForm reauthorization={reauthorization} /></div>}
            <ChangeEmail updateMail={updateMail} email={email}/>
        </div>
    );
};

export default ChangeEmailContainer;