import React, {useEffect, useState} from 'react';
import cl from "./Dialogs.module.css"
import DialogsSendMessageForm from "./DialogsSendMessageForm";
import {collection, getFirestore, onSnapshot, orderBy, query} from "firebase/firestore";
import {useParams} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import DialogsMessages from "./DialogsMessages";
import Loader from "../UI/Loader";


const Dialogs = ({sendMessage}) => {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const params = useParams()
    const [loading, setLoading] = useState(true)
    let dialogs = [];
    useEffect(() => {
        const q = query(collection(db, `dialogs/${params.id}/messages`), orderBy('createdAt'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            dialogs = []
            setLoading(true)
            querySnapshot.forEach((doc) => {
                dialogs.push(doc.data())
            });
            setLoading(false)
            console.log(dialogs)
        });
    }, [])
console.log('Все сообщения:  '+ dialogs)

    const createMessage = (data) => {
        sendMessage(data.body)
    }

    if (loading) {
        return <Loader/>
    }
    return (
        <div>
            <div className={cl.dialogsWindow}>
                {dialogs.map(m => <DialogsMessages displayName={m.displayName} text={m.text} uid={m.uid}
                                                               photoURL={m.photoURL}/>)}
            </div>

            <DialogsSendMessageForm createMessage={createMessage}/>
        </div>
    );
};

export default Dialogs;