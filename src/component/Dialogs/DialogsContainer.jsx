import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom"
import Dialogs from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {setMessagesAPI} from "../api/messagesAPI";
import {collection, doc, getDoc, getFirestore, limit, onSnapshot, orderBy, query, updateDoc} from "firebase/firestore";
import {removeMessages, setLastMessages, setMessages} from "../../reduxToolkit/slices/messagesSlice";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import Loader from "../UI/Loader";
import cl from "./Dialogs.module.css"


const DialogsContainer = () => {
    const navigate = useNavigate()
    const params = useParams()
    const {id, displayName, photoURL, email} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const {messages} = useSelector(state => state.messages)
    const {lastMessages} = useSelector(state => state.messages)
    const [visiblePopap, setVisiblePopap] = useState(false)
    const [userFound, setUserFound] = useState(false)
    const [userAdded,setUserAdded] = useState(false)

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    useEffect(() => {
        dispatch(removeMessages())
        const q = query(collection(db, `dialogs/${params.id}/messages`), limit(30), orderBy('createdAt', "desc"));
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            let dialogs = []
            querySnapshot.forEach((doc) => {
                const dateId = doc.data().createdAt.seconds + doc.data().createdAt.nanoseconds
                let midleElement = {
                    displayName: doc.data().displayName,
                    photoURL: doc.data().photoURL,
                    text: doc.data().text,
                    uid: doc.data().uid,
                    createdAt: new Date(doc.data().createdAt.seconds * 1000).toLocaleString(),
                    idMessages: dateId

                }
                dialogs.push(midleElement)
            });
            dispatch(setMessages(dialogs.reverse()))
            const lastMessages = querySnapshot.docs[querySnapshot.docs.length - 1];
            dispatch(setLastMessages(lastMessages))
            setLoading(false)
        });
    }, [params])


    const visiblePopapAddUser = () => {
        setUserFound(false)
        setUserAdded(false)
        setVisiblePopap(true)
    }


    const addUserToDialogs = async (params, data) => {             //функция по добавлению пользователя в беседу.
        const docRefUsers = doc(db, `users/${data.userId}`);  //Добавляет в личную информацию пользователя id беседы
        const docSnapUsers = await getDoc(docRefUsers);
        const dialogsList = docSnapUsers.data().dialogs            //Добавляет в информацию беседы id пользователя

        const docRefDialogs = doc(db, `dialogs/${params.id}`);
        const docSnapDialogs = await getDoc(docRefDialogs);
        const usersList = docSnapDialogs.data().users

        const usersRef = doc(db, `users/${data.userId}`);
        const dialogsRef = doc(db, `dialogs/${params.id}`);
        if(docSnapDialogs.data().users.indexOf(data.userId) != -1){  //Проверка, есть ли юзер в беседе
            setUserFound(true)
            setUserAdded(false)
        }
        else{                                                        //Если в беседе нет - добавляет
            if (docSnapUsers.data().dialogs) {

                dialogsList.push(params.id)                          //Добавляет юзеру в личную инфу id беседы, если список бесед есть
                await updateDoc(usersRef, {
                    dialogs: dialogsList
                });

            } else {
                await updateDoc(usersRef, {                     //Добавляет юзеру в личную инфу id беседы, если списка бесед нет
                    dialogs: [params.id]
                });

            }
            if(docSnapDialogs.data()){                               //Добавляет в инфу беседы id юзера
                usersList.push(data.userId)
                await updateDoc(dialogsRef, {
                    users:usersList
                });
            }
            setUserAdded(true)
        }
    }


    const sendMessage = async (body) => {
        await setMessagesAPI(params, body, photoURL, displayName, id)
    }


    if (loading || messages === null || messages === undefined) {
        return <Loader/>
    }
    if (!email) {
        navigate('/authorization')
    }
    return (
        <div className={cl.dialogsContainer}>
            <Dialogs
                userAdded={userAdded}
                userFound={userFound}
                lastMessages={lastMessages}
                messages={messages}
                loading={loading}
                sendMessage={sendMessage}
                visiblePopapAddUser={visiblePopapAddUser}
                visiblePopap={visiblePopap}
                setVisiblePopap={setVisiblePopap}
                addUserToDialogs={addUserToDialogs}
            />
        </div>
    );
};

export default DialogsContainer;