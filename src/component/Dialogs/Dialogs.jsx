import React, {useEffect, useRef, useState} from 'react';
import cl from "./Dialogs.module.css"
import DialogsSendMessageForm from "./DialogsSendMessageForm";
import {useParams} from "react-router-dom";
import DialogsMessages from "./DialogsMessages";
import Loader from "../UI/Loader";
import {useDispatch, useSelector} from "react-redux";
import {collection, getFirestore, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {setMessages} from "../../reduxToolkit/slices/messagesSlice";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";


const Dialogs = ({sendMessage}) => {

    const params = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const {messages} = useSelector(state => state.messages)
    const {id} = useSelector(state => state.user)
    const fieldRef = useRef(null)

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);



    //todo отрефакторить useEffect и перенести в DialogsContainer
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
    }, [])




    useEffect(() => {
        if(<DialogsSendMessageForm/>){
            console.log(fieldRef.current)
            fieldRef.current.scrollIntoView(false)
        }
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