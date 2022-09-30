import React from 'react';
import {useNavigate, useParams} from "react-router-dom"
import Dialogs from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {addMessagesAPI} from "../api/messagesAPI";
import {useEffect, useState} from "react";
import {collection, getFirestore, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {setMessages} from "../../reduxToolkit/slices/messagesSlice";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import Loader from "../UI/Loader";


const DialogsContainer = () => {
    const navigate = useNavigate()
    const params = useParams()
    const {id, displayName, photoURL,email} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const [loading, setLoading] = useState(false)
    const {messages} = useSelector(state => state.messages)


    useEffect(() => {
        const q = query(collection(db, `dialogs/${params.id}/messages`), limit(30), orderBy('createdAt', "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let dialogs = []
            querySnapshot.forEach((doc) => {
                dialogs.push(doc.data())
            });
            setLoading(false)
            dispatch(setMessages(dialogs.reverse()))

        });
    }, [])




    const sendMessage = async (body) => {
        await addMessagesAPI(params,body,photoURL,displayName,id)
    }

    if (loading || !messages) {
        return <Loader/>
    }
    if(!email){
        navigate('/authorization')
    }
    return (
        <div>
            <Dialogs messages={messages} loading={loading} sendMessage={sendMessage}/>
        </div>
    );
};

export default DialogsContainer;