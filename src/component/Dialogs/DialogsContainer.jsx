import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"
import {getDatabase, ref, child, get, set, push} from "firebase/database";
import Dialogs from "./Dialogs";

const DialogsContainer = () => {

    const params = useParams()
    const [isMessages, setIsMessages] = useState(false)


    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `dialogs/${params.id}`))
            .then((snapshot) => {
            if (!snapshot.exists()) {
                setIsMessages(true)
            } else {
                // console.log(snapshot.val())
            }
        }).catch((error) => {
            console.error(error);
        });
    },[])






    const sendMessage = (body,id,idMessages) => {
        debugger

        const db = getDatabase();
        const ref0 = push(ref(db, 'dialogs'));
        const id0 = ref0.key


        set(ref(db, `dialogs/${params.id}/ ${id0}`), {
                body:body,
                sender:id
        })
            .then(() => {
                const dbRef = ref(getDatabase());
                get(child(dbRef, `dialogs/${params.id}/ ${idMessages}`))
                    .then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());
                    }
                })
            })
    }



    return (
        <div>
            <Dialogs sendMessage={sendMessage} isMessages={isMessages} />
        </div>
    );
};

export default DialogsContainer;