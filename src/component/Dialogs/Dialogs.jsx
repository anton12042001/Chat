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
    const lastElement = useRef(null)
    const observer = useRef(null)
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

    useEffect(() => {
        var callback = function (entries, observer) {
            if (observer.current) observer.current.disconnect()
            if (entries[0].isIntersecting) {
                console.log(lastMessages)
                const q = query(collection(db, `dialogs/${params.id}/messages`),
                    limit(30),
                    orderBy('createdAt', "desc"),
                    startAfter(lastMessages));
                const unsubscribe =  onSnapshot(q, (querySnapshot) => {
                    debugger
                    let dialogs = []
                    querySnapshot.forEach((doc) => {
                        dialogs.push(doc.data())
                    });
                    console.log(dialogs)
                    dialogs.map(r => dispatch(additionalMessages(r)))
                    debugger
                    const lastMessages = querySnapshot.docs[querySnapshot.docs.length - 1];
                    dispatch(setLastMessages(lastMessages))
                    console.log("отработала")
                });
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current)
    }, [])


    const createMessage = (data) => {
        sendMessage(data.body)
    }

    const loadMoreMessages = () => {
        console.log("ща отработает")
        const q = query(collection(db, `dialogs/${params.id}/messages`),
            limit(30),
            orderBy('createdAt', "desc"),
            startAfter(lastMessages));
        debugger
        onSnapshot(q,  (querySnapshot) => {
            debugger
            let dialogs = []
            querySnapshot.forEach((doc) => {
                dialogs.push(doc.data())
            });
            dialogs.map(r => dispatch(additionalMessages(r)))
            debugger
            const lastMessages = querySnapshot.docs[querySnapshot.docs.length - 1];
            dispatch(setLastMessages(lastMessages))
            console.log("отработала")
        });

    }


    return (
        <div className={cl.container}>
            <button onClick={loadMoreMessages}>Загрузить еще сообщения</button>
            <div ref={windowHeghtRef}>
                <div ref={lastElement} style={{height: 20, background: "red"}}></div>
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