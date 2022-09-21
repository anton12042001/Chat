import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"
import Dialogs from "./Dialogs";
import {addDoc, collection, doc, getFirestore, serverTimestamp, updateDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import {useSelector} from "react-redux";


const DialogsContainer = () => {

    const params = useParams()
    const [isMessages, setIsMessages] = useState(false)
    const {id} = useSelector(state => state.user)



    useEffect(() => {

    },[])






    const sendMessage = async (body) => {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // const docRef = doc(db, 'objects', 'some-id');
        // const updateTimestamp = await updateDoc(docRef, {
        //     timestamp: serverTimestamp()
        // });

        try {
            const docRef = await addDoc(collection(db, `dialogs/${params.id}/messages`), {
                uid:id,
                text:body,

            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }



    return (
        <div>
            <Dialogs sendMessage={sendMessage} isMessages={isMessages} />
        </div>
    );
};

export default DialogsContainer;