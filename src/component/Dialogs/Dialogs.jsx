import React, {useEffect, useRef} from 'react';
import cl from "./Dialogs.module.css"
import DialogsSendMessageForm from "./DialogsSendMessageForm";
import DialogsMessages from "./DialogsMessages";
import {useDispatch, useSelector} from "react-redux";
import {query, orderBy, startAt, getFirestore, onSnapshot} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";

import { collection, startAfter, limit, getDocs, endBefore,endAt,} from "firebase/firestore";
import {additionalMessages, setLastMessages, setMessages} from "../../reduxToolkit/slices/messagesSlice";
import {useParams} from "react-router-dom";


const Dialogs = ({sendMessage,messages,loading}) => {


    const {id} = useSelector(state => state.user)
    const fieldRef = useRef(null)

    const params = useParams()
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const {lastMessages} = useSelector(state => state.messages)
    const dispatch = useDispatch()

    useEffect(() => {
        if(<DialogsSendMessageForm/> && fieldRef.current ){
            fieldRef.current.scrollIntoView(false)
        }
    },[loading])

    const createMessage = (data) => {
        sendMessage(data.body)
    }


    const loadMoreMessages = () => {
        const q = query(collection(db, `dialogs/${params.id}/messages`), limit(30), orderBy('createdAt', "desc"),startAfter(lastMessages),);
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            let dialogs = []
            querySnapshot.forEach((doc) => {
                dialogs.push(doc.data())
            });
            console.log(dialogs)
            dialogs.map(r => dispatch(additionalMessages(r)))
            const lastMessages =  querySnapshot.docs[querySnapshot.docs.length - 1];
            dispatch(setLastMessages(lastMessages))
        });
    }



    return (
        <div className={cl.container}>
            <button onClick={loadMoreMessages} >Загрузить еще сообщения</button>
            <div>
                {messages.map(m => <DialogsMessages displayName={m.displayName} text={m.text} uid={m.uid} id={id}
                                                    photoURL={m.photoURL}/>)}
            </div>

            <div ref={fieldRef} >
                <DialogsSendMessageForm createMessage={createMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;