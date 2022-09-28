import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import cl from "./Dialogs.module.css"
import DialogsSendMessageForm from "./DialogsSendMessageForm";
import {collection, getFirestore, onSnapshot, orderBy, query, limit,} from "firebase/firestore";
import {useParams} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import DialogsMessages from "./DialogsMessages";
import Loader from "../UI/Loader";
import {useDispatch, useSelector} from "react-redux";
import {setMessages} from "../../reduxToolkit/slices/messagesSlice";


const Dialogs = ({sendMessage}) => {

    const params = useParams()
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const {messages} = useSelector(state => state.messages)
    const {id} = useSelector(state => state.user)
    const fieldRef = useRef(null)
    console.log(fieldRef)
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    useEffect(() => {
        const q = query(collection(db, `dialogs/${params.id}/messages`), limit(30), orderBy('createdAt', "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let dialogs = []
            querySnapshot.forEach((doc) => {
                dialogs.push(doc.data())
            });
            dispatch(setMessages(dialogs.reverse()))
            setLoading(false)
        });
        console.log("юзэффект с загрузкой сообщений")
    }, [])

    useEffect(() => {

        if(<DialogsSendMessageForm/> && fieldRef.current){
            debugger
            console.log(fieldRef.current)
            fieldRef.current.scrollIntoView(false)
        }
        console.log("юзэффект с скоролом")
    },[loading])

    const createMessage = (data) => {
        sendMessage(data.body)
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <div className={cl.container}>
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