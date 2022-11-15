import {
    addDoc,
    collection,
    doc,
    getDoc,
    getFirestore,
    limit,
    onSnapshot,
    orderBy,
    query,
    startAfter,
    updateDoc
} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebase";
import {removeDialogs, setDialogs} from "../reduxToolkit/slices/dialogsIdSlice";
import {NavbarShowDialogs} from "../component/Home/NavbarShowDialogs";
import {additionalMessages, setLastMessages, setMessages} from "../reduxToolkit/slices/messagesSlice";
import {removeCurrentDialogsUserInfo, setCurrentDialogsUserInfo} from "../reduxToolkit/slices/showDialogs";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);





export const createDialogAPI = async (dialogsName, uidDialogs, dispatch, id, dialogs, privateDialogs) => {
    const docRef = await addDoc(collection(db, "dialogs"), {
        admin: id,
        dialogsName: dialogsName,
        users: (privateDialogs) ? [id, uidDialogs] : [id],
        privateDialogs
    })
    const dialogsRef = doc(db, "users", id);
    let dialogsList = [...dialogs]
    dialogsList.push(docRef.id)

    await updateDoc(dialogsRef, {
        dialogs: dialogsList
    });
    dispatch(setDialogs(dialogsList))
}


export const NavbarDialogsObserverAPI = (dialogs, id, dispatch, dialogsForShow) => {
    if (dialogs && id) {
        const unsub = onSnapshot(doc(db, `users/${id}`), async (doc) => {
            if (doc.data().dialogs.length > dialogs.length) {
                dispatch(removeDialogs())
                dispatch(setDialogs(doc.data().dialogs))
                const newDialog = [doc.data().dialogs[doc.data().dialogs.length - 1]]
                await NavbarShowDialogs(newDialog, dispatch, dialogsForShow)
            }
        });
    }
}


export const loadInitialInfoDialogsAPI = async (params,setPrivateDialog) => {
    const docRef = doc(db, `dialogs/${params.id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.data().privateDialogs) {
        setPrivateDialog(true)
        const usersRef = doc(db, `users/${docSnap.data().users[docSnap.data().users.length - 1]}`);
        const docSnapUsers = await getDoc(usersRef);
        if (docSnapUsers.data().dialogs.indexOf(params.id) != -1) {  //Проверка, есть ли в личной инфе юзера приватная беседа
            return
        } else {
            if (docSnap.exists()) {
                if (docSnap.data().privateDialogs) {
                    const docSnapUsers = await getDoc(usersRef);
                    const dialogsList = docSnapUsers.data().dialogs
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
                }
            }
        }
    }
    else{
        setPrivateDialog(false)
    }
}



export const loadInitialMessagesAPI = (params, dispatch, setLoading) => {
    const q = query(collection(db, `dialogs/${params.id}/messages`), limit(30), orderBy('createdAt', "desc"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const dialogs = []
        const messagesItem = []
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
        dispatch(setMessages(messagesItem))
        dispatch(setMessages(dialogs.reverse()))
        const lastMessages = querySnapshot.docs[querySnapshot.docs.length - 1];
        dispatch(setLastMessages(lastMessages))
        setLoading(false)
    });
}

export const loadMoreMessagesAPI = (params, lastMessages, dialogs, dispatch,currentDialogsUserInfo) => {
    const q = query(collection(db, `dialogs/${params.id}/messages`),
        limit(30),
        orderBy('createdAt', "desc"),
        startAfter(lastMessages))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
        dialogs.map(r => dispatch(additionalMessages(r)))
        const lastMessages = querySnapshot.docs[querySnapshot.docs.length - 1];
        dispatch(setLastMessages(lastMessages))
    });
}



export const addUserToDialogsAPI = async (params, data, setUserFound, setUserAdded) => { //функция по добавлению пользователя в беседу.
    const docRefUsers = doc(db, `users/${data.userId}`);  //Добавляет в личную информацию пользователя id беседы
    const docSnapUsers = await getDoc(docRefUsers);
    const dialogsList = docSnapUsers.data().dialogs            //Добавляет в информацию беседы id пользователя

    const docRefDialogs = doc(db, `dialogs/${params.id}`);
    const docSnapDialogs = await getDoc(docRefDialogs);
    const usersList = docSnapDialogs.data().users

    const usersRef = doc(db, `users/${data.userId}`);
    const dialogsRef = doc(db, `dialogs/${params.id}`);
    if (docSnapDialogs.data().users.indexOf(data.userId) != -1) {  //Проверка, есть ли юзер в беседе
        setUserFound(true)
        setUserAdded(false)
    } else {                                                        //Если в беседе нет - добавляет
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
        if (docSnapDialogs.data()) {                               //Добавляет в инфу беседы id юзера
            usersList.push(data.userId)
            await updateDoc(dialogsRef, {
                users: usersList
            });
        }
        setUserAdded(true)
    }
}



export const getUserInfoCurrentDialogAPI = async (users,dispatch) => {
    dispatch(removeCurrentDialogsUserInfo())
    users.map(async u => {
        const docRef = doc(db, "users", `${u}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            dispatch(setCurrentDialogsUserInfo(docSnap.data()))
        }
    })
}


export const deleteUserFromDialogsAPI = async (userId,dialogId) => {
    const arrayDialogsUser = []
    const arrayUsers = []

    const userRef = doc(db, "users", `${userId}`);
    const docSnapUsers = await getDoc(userRef);

    const dialogsRef = doc(db, "dialogs", `${dialogId}`);
    const docSnapDialogs = await getDoc(dialogsRef);

    if(docSnapDialogs.exists()){
        docSnapDialogs.data().users.map(u => {
            if(u !== userId){
                arrayUsers.push(u)
            }
        })
        await updateDoc(dialogsRef, {
            users: arrayUsers
        });

        docSnapUsers.data().dialogs.map(d => {
            if(d !== dialogId ){
                arrayDialogsUser.push(d)
            }
        })
        await updateDoc(userRef, {
            dialogs: arrayDialogsUser
        });

    }

}
export const dialogueSubscription = (params,dispatch,setCurrentDialogInfo,) => {
    const unsub = onSnapshot(doc(db, "dialogs", `${params.id}`), (doc) => {
        setCurrentDialogInfo({
            info:{
                admin: doc.data().admin,
                dialogsName: doc.data().dialogsName,
                privateDialogs: doc.data().privateDialogs,
                users: doc.data().users,
            },
            id:params.id

        })
    });
}
export const exitFromDialog = async (id,params) => {
    const arrayUsers = []
    const arrayDialogs = []

    const dialogsRef = doc(db, "dialogs", `${params.id}`);
    const docSnapDialogs = await getDoc(dialogsRef);

    const usersRef = doc(db, "users", `${id}`);
    const docSnapUsers = await getDoc(usersRef);

    if (docSnapDialogs.exists()) {
        docSnapDialogs.data().users.map(u => {
           if(u !== id){
               arrayUsers.push(u)
           }
        })
        await updateDoc(dialogsRef, {
            users: arrayUsers
        });
    }
    if(docSnapUsers.exists()){
        docSnapUsers.data().dialogs.map(d => {
            debugger
            if(d !== params.id){
                debugger
                arrayDialogs.push(d)
            }
        })
        await updateDoc(usersRef, {
            dialogs: arrayDialogs
        });
    }

}