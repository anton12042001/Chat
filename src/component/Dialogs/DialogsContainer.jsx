import React from 'react';
import {useNavigate, useParams} from "react-router-dom"
import Dialogs from "./Dialogs";
import {useSelector} from "react-redux";
import {addMessagesAPI} from "../api/messagesAPI";


const DialogsContainer = () => {
    const navigate = useNavigate()
    const params = useParams()
    const {id, displayName, photoURL,email} = useSelector(state => state.user)


    const sendMessage = async (body) => {
        await addMessagesAPI(params,body,photoURL,displayName,id)
    }

    if(!email){
        navigate('/authorization')
    }
    return (
        <div>
            <Dialogs  sendMessage={sendMessage}/>
        </div>
    );
};

export default DialogsContainer;