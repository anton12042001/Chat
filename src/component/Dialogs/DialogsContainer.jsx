import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom"
import Dialogs from "./Dialogs";
import {addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import {useSelector} from "react-redux";


const DialogsContainer = () => {

    const params = useParams()
    const {id, displayName, photoURL} = useSelector(state => state.user)
    const {messages} = useSelector(state => state.messages)
    console.log(messages)

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);



    const sendMessage = async (body) => {
        try {
            const docRef = await addDoc(collection(db, `dialogs/${params.id}/messages`), {
                uid: id,
                displayName: displayName,
                photoURL: photoURL,
                text: body,
                createdAt: serverTimestamp()

            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    return (
        <div>
            <Dialogs  sendMessage={sendMessage}/>
        </div>
    );
};

export default DialogsContainer;