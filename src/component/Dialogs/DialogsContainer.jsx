import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom"
import Dialogs from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {setMessagesAPI} from "../api/messagesAPI";
import {removeMessages} from "../../reduxToolkit/slices/messagesSlice";
import Loader from "../UI/Loader";
import cl from "./Dialogs.module.css"
import {addUserToDialogsAPI, loadInitialInfoDialogsAPI, loadInitialMessagesAPI} from "../api/dialogsAPI";


const DialogsContainer = () => {
    const navigate = useNavigate()
    const params = useParams()
    const {id, displayName, photoURL, email} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const {messages} = useSelector(state => state.messages)
    const {lastMessages} = useSelector(state => state.messages)
    const [visiblePopap, setVisiblePopap] = useState(false)
    const [userFound, setUserFound] = useState(false)
    const [userAdded,setUserAdded] = useState(false)



    useEffect(() => {
        dispatch(removeMessages())
        loadInitialMessagesAPI(params,dispatch,setLoading)
        loadInitialInfoDialogsAPI(params,)
    }, [params])

    const visiblePopapAddUser = () => {
        setUserFound(false)
        setUserAdded(false)
        setVisiblePopap(true)
    }

    const addUserToDialogs =  (params, data) => {
        addUserToDialogsAPI(params,data,setUserFound,setUserAdded)
    }

    const sendMessage = async (body) => {
        await setMessagesAPI(params, body, photoURL, displayName, id)
    }


    if (loading || messages === null || messages === undefined) {
        return <Loader/>
    }
    if (!email) {
        navigate('/authorization')
    }


    return (
        <div className={cl.dialogsContainer}>
            <Dialogs
                userAdded={userAdded}
                userFound={userFound}
                lastMessages={lastMessages}
                messages={messages}
                loading={loading}
                sendMessage={sendMessage}
                visiblePopapAddUser={visiblePopapAddUser}
                visiblePopap={visiblePopap}
                setVisiblePopap={setVisiblePopap}
                addUserToDialogs={addUserToDialogs}
            />
        </div>
    );
};

export default DialogsContainer;