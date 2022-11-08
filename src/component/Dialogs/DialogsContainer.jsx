import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom"
import Dialogs from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {setMessagesAPI} from "../api/messagesAPI";
import {removeMessages} from "../../reduxToolkit/slices/messagesSlice";
import Loader from "../UI/Loader";
import cl from "./Dialogs.module.css"
import {
    addUserToDialogsAPI,
    deleteUserFromDialogsAPI,
    dialogueSubscription, exitFromDialog,
    getUserInfoCurrentDialogAPI,
    loadInitialInfoDialogsAPI,
    loadInitialMessagesAPI
} from "../api/dialogsAPI";
import {removeDialogsForShow, setCurrentDialogs, setDialogsForShow} from "../../reduxToolkit/slices/showDialogs";
import {removeDialogs, setDialogs} from "../../reduxToolkit/slices/dialogsIdSlice";


const DialogsContainer = () => {
    const navigate = useNavigate()
    const {dialogs} = useSelector(state => state.dialogs)
    const {dialogsForShow} = useSelector(state => state.showDialogs)
    const params = useParams()
    const {id, displayName, photoURL, email} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const {messages} = useSelector(state => state.messages)
    const {lastMessages} = useSelector(state => state.messages)
    const [visiblePopap, setVisiblePopap] = useState(false)
    const [userFound, setUserFound] = useState(false)
    const [userAdded,setUserAdded] = useState(false)
    const [privateDialog,setPrivateDialog] = useState(false)
    const [currentDialogInfo,setCurrentDialogInfo] = useState({
        info:{
            admin: null ,
            dialogsName: null,
            privateDialogs: null,
            users: null,
        },
        id:null
    })




    useEffect(() => {
        dialogueSubscription(params,dispatch,setCurrentDialogInfo,currentDialogInfo)
    },[])

    useEffect(() => {
        dispatch(setCurrentDialogs(currentDialogInfo))
    },[currentDialogInfo])



    useEffect(() => {
        dispatch(removeMessages())
        loadInitialMessagesAPI(params,dispatch,setLoading)
        loadInitialInfoDialogsAPI(params,setPrivateDialog)
        setPrivateDialog(true)
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
    const deleteUserFromDialogs = (userId,dialogId) => {
        deleteUserFromDialogsAPI(userId,dialogId)
    }

    const getUserInfoCurrentDialog = (users) => {
        getUserInfoCurrentDialogAPI(users,dispatch)
    }

    const exitUserFromDialogs = (id) => {
        const dialogsId = []
        const dialogsIdInfo = [...dialogsForShow]
        exitFromDialog(id,params)
            .then(() => {
                dialogs.map(d => {
                    if(d !== params.id){
                        dialogsId.push(d)
                    }
                })
                dispatch(removeDialogs())
                dispatch(setDialogs(dialogsId))
                dispatch(removeDialogsForShow())
                dialogsIdInfo.map(d => {
                   if(d.id !== params.id){
                       dispatch(setDialogsForShow(d))
                   }
                })
                navigate('/home')
            })
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
                exitUserFromDialogs={exitUserFromDialogs}
                getUserInfoCurrentDialog={getUserInfoCurrentDialog}
                deleteUserFromDialogs={deleteUserFromDialogs}
                privateDialog={privateDialog}
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