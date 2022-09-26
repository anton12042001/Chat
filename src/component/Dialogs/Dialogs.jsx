import React, {useEffect, useState} from 'react';
import cl from "./Dialogs.module.css"
import DialogsSendMessageForm from "./DialogsSendMessageForm";
import {collection, getFirestore, onSnapshot, orderBy, query} from "firebase/firestore";
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

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);



    useEffect(() => {
        const q = query(collection(db, `dialogs/${params.id}/messages`), orderBy('createdAt'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let dialogs = []
            setLoading(true)
            querySnapshot.forEach((doc) => {
                dialogs.push(doc.data())
            });
            setLoading(false)
            console.log(dialogs)
            dispatch(setMessages(dialogs))
        });
    }, [])



    const createMessage = (data) => {
        sendMessage(data.body)
    }




    if (loading) {
        return <Loader/>
    }

    return (
        <div>
            <div className={cl.dialogsWindow}>
                {messages.map(m => <DialogsMessages displayName={m.displayName} text={m.text} uid={m.uid} id={id}
                                                 photoURL={m.photoURL}/>)}
            </div>

            <DialogsSendMessageForm createMessage={createMessage}/>
        </div>
    );
};

export default Dialogs;