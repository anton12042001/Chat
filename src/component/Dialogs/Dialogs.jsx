import React, {useEffect, useRef, useState} from 'react';
import cl from "./Dialogs.module.css"
import DialogsSendMessageForm from "./DialogsMessages/DialogsSendMessageForm";
import DialogsMessages from "./DialogsMessages/DialogsMessages";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import DialogsAddUserPopap from "./DialogsAddUserPopap/DialogsAddUserPopap";
import {loadMoreMessagesAPI} from "../../api/dialogsAPI";
import CurrentDialogsInfoContainer from "./CurrentDialogsInfo/CurrentDialogsInfoContainer";
import DialogsPopapDeleteUserContainer from "./DialogsPopapDeleteUser/DialogsPopapDeleteUserContainer";
import Loader from "../UI/Loader";


const Dialogs = ({exitUserFromDialogs, getUserInfoCurrentDialog, deleteUserFromDialogs, privateDialog, sendMessage,
                     messages, loading, lastMessages, visiblePopapAddUser, visiblePopap, setVisiblePopap,
                     addUserToDialogs, userFound, userAdded
                 }) => {
    const {id} = useSelector(state => state.user)
    const params = useParams()
    const dispatch = useDispatch()
    const [countLoadingMessages, setCountLoadingMessages] = useState(0);
    const fieldRef = useRef(null)
    const windowHeghtRef = useRef(null)
    const lastElement = useRef(null)
    const [popapDeleteUser, setPopapDeleteUser] = useState(false)
    const {currentDialogs, currentDialogsUserInfo} = useSelector(state => state.showDialogs)
    let dialogs = []


    useEffect(() => {
        if (<DialogsSendMessageForm/> && fieldRef.current) {
            fieldRef.current.scrollIntoView(false)
        }
    }, [loading])


    useEffect(() => {
        if (messages.length % 30 === 0) {
            setCountLoadingMessages(countLoadingMessages + 1)
            window.scrollTo(0, 2330)
        } else {
            let scrollTop = windowHeghtRef.current.clientHeight - (countLoadingMessages * 2330)
            window.scrollTo(0, scrollTop)
        }
    }, [lastMessages])


    useEffect(() => {
        if (!lastElement.current) return;
        const observer = new IntersectionObserver(([{isIntersecting}]) => {
            if (isIntersecting && dialogs < 30) {
                loadMoreMessages()
            }
        });
        observer.observe(lastElement.current);
        return () => observer.disconnect();
    }, [countLoadingMessages]);


    const deleteUserFromDialogParams = (id) => {
        debugger
        const dialogId = params.id
        deleteUserFromDialogs(id, dialogId)
    }


    const createMessage = (data) => {
        sendMessage(data.body)
    }

    const loadMoreMessages = () => {
        loadMoreMessagesAPI(params, lastMessages, dialogs, dispatch, currentDialogsUserInfo)
    }

    if (!currentDialogs) {
        return <Loader/>
    }

    return (
        <div className={cl.dialogsBackground}>
            <div className={cl.container}>
                <div className={cl.flextest}>
                    <div className={cl.dialogsInfo}>
                        <CurrentDialogsInfoContainer
                            visiblePopap={visiblePopap}
                            userAdded={userAdded}
                            userFound={userFound}
                            addUserToDialogs={addUserToDialogs}
                            setVisiblePopap={setVisiblePopap}
                            visiblePopapAddUser={visiblePopapAddUser}
                            privateDialog={privateDialog}
                            exitUserFromDialogs={exitUserFromDialogs}
                            setPopapDeleteUser={setPopapDeleteUser}/>
                    </div>
                    <div className={cl.messagesItems} ref={windowHeghtRef}>
                        <div className={cl.lastElement} ref={lastElement}></div>
                        {(messages.length === 0) && <div className={cl.noMessages}>В этом диалоге нет сообщений</div>}
                        {messages.map(m => <DialogsMessages displayName={m.displayName} text={m.text} uid={m.uid}
                                                            id={id}
                                                            photoURL={m.photoURL} key={m.idMessages}
                                                            createdAt={m.createdAt}/>)}
                    </div>
                </div>
                <div className={cl.sendMessagesOrAddUser} ref={fieldRef}>
                    <DialogsSendMessageForm createMessage={createMessage}/>
                </div>
                {
                    (popapDeleteUser) && <div onClick={() => setPopapDeleteUser(false)} className={cl.popapDeleteUser}>
                        <DialogsPopapDeleteUserContainer deleteUserFromDialogParams={deleteUserFromDialogParams}
                                                         getUserInfoCurrentDialog={getUserInfoCurrentDialog}/>
                    </div>

                }
            </div>
        </div>
    );
};

export default Dialogs;