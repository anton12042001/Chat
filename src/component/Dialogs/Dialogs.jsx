import React, {useEffect, useRef, useState} from 'react';
import cl from "./Dialogs.module.css"
import DialogsSendMessageForm from "./DialogsSendMessageForm";
import {collection, getFirestore, onSnapshot, orderBy, query,limit,} from "firebase/firestore";
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
    const dialogsRef = useRef()

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    useEffect(() => {
        const q = query(collection(db, `dialogs/${params.id}/messages`), limit(50), orderBy('createdAt',"desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let dialogs = []
            setLoading(true)
            querySnapshot.forEach((doc) => {
                dialogs.push(doc.data())
            });
            setLoading(false)
            console.log(dialogs)
            dispatch(setMessages(dialogs.reverse()))


            console.log(dialogsRef)
            window.scrollTo(0, dialogsRef.clientHeight)

        });
    }, [])



    const createMessage = (data) => {
        sendMessage(data.body)
    }




    if (loading) {
        return <Loader/>
    }

    return (
        <div className={cl.container} >
            <div ref={dialogsRef}  >
                {messages.map(m => <DialogsMessages displayName={m.displayName} text={m.text} uid={m.uid} id={id}
                                                 photoURL={m.photoURL}/>)}
            </div>

            <DialogsSendMessageForm createMessage={createMessage}/>
        </div>
    );
};

export default Dialogs;