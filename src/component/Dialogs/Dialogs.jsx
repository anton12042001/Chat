import React, {useEffect, useRef, useState} from 'react';
import cl from "./Dialogs.module.css"
import DialogsSendMessageForm from "./DialogsMessages/DialogsSendMessageForm";
import DialogsMessages from "./DialogsMessages/DialogsMessages";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import DialogsAddUserPopap from "./DialogsAddUserPopap/DialogsAddUserPopap";
import {loadMoreMessagesAPI} from "../api/dialogsAPI";
import CurrentDialogsInfoContainer from "./CurrentDialogsInfo/CurrentDialogsInfoContainer";
import DialogsPopapDeleteUser from "./DialogsPopapDeleteUser/DialogsPopapDeleteUser";


const Dialogs = ({
                     privateDialog, sendMessage, messages, loading, lastMessages, visiblePopapAddUser,
                     visiblePopap, setVisiblePopap, addUserToDialogs, userFound, userAdded
                 }) => {
    const {id} = useSelector(state => state.user)
    const params = useParams()
    const dispatch = useDispatch()
    const [countLoadingMessages, setCountLoadingMessages] = useState(0);
    const fieldRef = useRef(null)
    const windowHeghtRef = useRef(null)
    const lastElement = useRef(null)
    const [popapDeleteUser, setPopapDeleteUser] = useState(false)
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


    const createMessage = (data) => {
        sendMessage(data.body)
    }

    const loadMoreMessages = () => {
        loadMoreMessagesAPI(params, lastMessages, dialogs, dispatch)
    }


    return (
        <div className={cl.container}>
            <div className={cl.dialogsInfo}><CurrentDialogsInfoContainer setPopapDeleteUser={setPopapDeleteUser}/></div>
            <div ref={windowHeghtRef}>
                <div className={cl.lastElement} ref={lastElement}></div>
                {(messages.length === 0) && <div className={cl.noMessages}>В этом диалоге нет сообщений</div>}
                {messages.map(m => <DialogsMessages displayName={m.displayName} text={m.text} uid={m.uid} id={id}
                                                    photoURL={m.photoURL} key={m.idMessages} createdAt={m.createdAt}/>)}
            </div>
            <div className={cl.sendMessagesOrAddUser} ref={fieldRef}>
                <DialogsSendMessageForm createMessage={createMessage}/>
                <div className={cl.addUserToChat}>
                    {!privateDialog && <button onClick={visiblePopapAddUser}>Добавить пользователя в чат</button>}
                    {(visiblePopap) && <DialogsAddUserPopap
                        userAdded={userAdded}
                        userFound={userFound}
                        addUserToDialogs={addUserToDialogs}
                        setVisiblePopap={setVisiblePopap}/>}
                </div>
            </div>
            {
                (popapDeleteUser) && <div className={cl.popapDeleteUser}><DialogsPopapDeleteUser/></div>

            }
        </div>
    );
};

export default Dialogs;