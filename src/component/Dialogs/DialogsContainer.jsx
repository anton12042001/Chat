import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom"
import Dialogs from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {setMessagesAPI} from "../api/messagesAPI";
import {collection, getFirestore, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {setLastMessages, setMessages} from "../../reduxToolkit/slices/messagesSlice";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import Loader from "../UI/Loader";


const DialogsContainer = () => {
    const navigate = useNavigate()
    const params = useParams()
    const {id, displayName, photoURL,email} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const {messages} = useSelector(state => state.messages)
    const {lastMessages} = useSelector(state => state.messages)

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    useEffect(() => {
        const q = query(collection(db, `dialogs/${params.id}/messages`), limit(30), orderBy('createdAt', "desc"));
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            let dialogs = []
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
            setLoading(false)
            dispatch(setMessages(dialogs.reverse()))
            const lastMessages =  querySnapshot.docs[querySnapshot.docs.length - 1];
            dispatch(setLastMessages(lastMessages))
        });
    }, [])






    const sendMessage = async (body) => {
        await setMessagesAPI(params,body,photoURL,displayName,id)
    }

    if (loading || !messages || !lastMessages) {
        return <Loader/>
    }
    if(!email){
        navigate('/authorization')
    }
    return (
        <div>
            <Dialogs lastMessages={lastMessages} messages={messages} loading={loading} sendMessage={sendMessage}/>
        </div>
    );
};

export default DialogsContainer;