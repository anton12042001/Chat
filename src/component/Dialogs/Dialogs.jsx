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


const Dialogs = ({sendMessage, messages, loading, lastMessages}) => {
    const {id} = useSelector(state => state.user)
    const params = useParams()
    const dispatch = useDispatch()
    const [countLoadingMessages, setCountLoadingMessages] = useState(-1);
    const fieldRef = useRef(null)
    const windowHeghtRef = useRef(null)
    const lastElement = useRef(null)
    let dialogs = []

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    useEffect(() => {
        if (<DialogsSendMessageForm/> && fieldRef.current) {
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
        const q = query(collection(db, `dialogs/${params.id}/messages`),
            limit(30),
            orderBy('createdAt', "desc"),
            startAfter(lastMessages))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const dateId = doc.data().createdAt.seconds + doc.data().createdAt.nanoseconds
                let midleElement = {
                    displayName:doc.data().displayName,
                    photoURL: doc.data().photoURL,
                    text: doc.data().text,
                    uid:doc.data().uid,
                    createdAt:new Date(doc.data().createdAt.seconds * 1000).toLocaleString(),
                    idMessages:dateId

                }
                dialogs.push(midleElement)
            });
            dialogs.map(r => dispatch(additionalMessages(r)))
            const lastMessages = querySnapshot.docs[querySnapshot.docs.length - 1];
            dispatch(setLastMessages(lastMessages))
        });
    }

    return (
        <div className={cl.container}>
            <div ref={windowHeghtRef}>
                <div className={cl.lastElement}  ref={lastElement}></div>
                {(messages.length === 0) && <div className={cl.noMessages} >В этом диалоге нет сообщений</div>}
                {messages.map(m => <DialogsMessages displayName={m.displayName} text={m.text} uid={m.uid} id={id}
                                                    photoURL={m.photoURL} key={m.idMessages} />)}
            </div>

            <div ref={fieldRef}>
                <DialogsSendMessageForm createMessage={createMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;