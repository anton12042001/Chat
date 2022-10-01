import React, {useEffect, useRef, useState} from 'react';
import cl from "./Dialogs.module.css"
import DialogsSendMessageForm from "./DialogsSendMessageForm";
import DialogsMessages from "./DialogsMessages";
import {useDispatch, useSelector} from "react-redux";
import {collection, getFirestore, limit, onSnapshot, orderBy, query, startAfter} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import {additionalMessages, setLastMessages} from "../../reduxToolkit/slices/messagesSlice";
import {useParams} from "react-router-dom";


const Dialogs = ({sendMessage, messages, loading}) => {

    const {id} = useSelector(state => state.user)
    const {lastMessages} = useSelector(state => state.messages)
    const params = useParams()
    const dispatch = useDispatch()
    const [countLoadingMessages, setCountLoadingMessages] = useState(-1);
    const fieldRef = useRef(null)
    const windowHeghtRef = useRef(null)
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    useEffect(() => {
        if (<DialogsSendMessageForm/> && fieldRef.current) {
            console.log(fieldRef)
            fieldRef.current.scrollIntoView(false)
        }
    }, [loading])


    useEffect(() => {
        if (messages.length % 30 === 0) {
            setCountLoadingMessages(countLoadingMessages + 1)
            window.scrollTo(0, 1850)
        } else {
            let scrollTop = windowHeghtRef.current.clientHeight - (countLoadingMessages * 1850)
            window.scrollTo(0, scrollTop)
        }
    }, [lastMessages])


    const createMessage = (data) => {
        sendMessage(data.body)
    }

    const loadMoreMessages = () => {
        const q = query(collection(db, `dialogs/${params.id}/messages`), limit(30), orderBy('createdAt', "desc"), startAfter(lastMessages),);
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            let dialogs = []
            querySnapshot.forEach((doc) => {
                dialogs.push(doc.data())
            });
            dialogs.map(r => dispatch(additionalMessages(r)))
            const lastMessages = querySnapshot.docs[querySnapshot.docs.length - 1];
            dispatch(setLastMessages(lastMessages))
        });

    }


    return (
        <div className={cl.container}>
            <button onClick={loadMoreMessages}>Загрузить еще сообщения</button>
            <div ref={windowHeghtRef}>
                {messages.map(m => <DialogsMessages displayName={m.displayName} text={m.text} uid={m.uid} id={id}
                                                    photoURL={m.photoURL}/>)}
            </div>

            <div ref={fieldRef}>
                <DialogsSendMessageForm createMessage={createMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;