import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"
import Dialogs from "./Dialogs";
import {addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp, where} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import {useSelector} from "react-redux";


const DialogsContainer = () => {

    const params = useParams()
    const [isMessages, setIsMessages] = useState(false)
    const {id,displayName,photoURL} = useSelector(state => state.user)


    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);





    useEffect( () => {
        // onSnapshot(doc(db, `/dialogs/${params.id}` ), (collection) => {
        //     console.log("Current data: ", collection.data());
        // });
        const dialogs = [];
        const q = query(collection(db, `dialogs/${params.id}/messages`), orderBy('createdAt'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            querySnapshot.forEach((doc) => {
                dialogs.push(doc.data());
            });
        });
        console.log(dialogs);
    },[])







    const sendMessage = async (body) => {


        try {
            const docRef = await addDoc(collection(db, `dialogs/${params.id}/messages`), {
                uid:id,
                displayName:displayName,
                photoURL:photoURL,
                text:body,
                createdAt:serverTimestamp()

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