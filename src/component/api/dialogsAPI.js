import {
    addDoc,
    collection,
    doc,
    getDoc,
    getFirestore,
    limit,
    onSnapshot,
    orderBy,
    query, startAfter,
    updateDoc
} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import {removeDialogs, setDialogs} from "../../reduxToolkit/slices/dialogsIdSlice";
import {NavbarShowDialogs} from "../Home/NavbarShowDialogs";
import {additionalMessages, setLastMessages, setMessages} from "../../reduxToolkit/slices/messagesSlice";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);






export const createDialogAPI = async (dialogsName,dispatch,id,dialogs) => {
    const docRef = await addDoc(collection(db, "dialogs"), {
        admin:id,
        dialogsName:dialogsName,
        users:[id],
    })
    const dialogsRef = doc(db, "users", id);
    let dialogsList = [...dialogs]
    dialogsList.push(docRef.id)

    await updateDoc(dialogsRef, {
        dialogs:dialogsList
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




//TODO доработать отрисовку актуального имени пользователя, если он сменил имя
export const loadInitialMessagesAPI = (params, dispatch, setLoading) => {
    const q = query(collection(db, `dialogs/${params.id}/messages`), limit(30), orderBy('createdAt', "desc"));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        let dialogs = []
        querySnapshot.forEach((doc) => {
            debugger
            console.log(doc)
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
}
//TODO доработать отрисовку актуального имени пользователя, если он сменил имя


//TODO доработать отрисовку актуального имени пользователя, если он сменил имя
export const loadMoreMessagesAPI = (params,lastMessages,dialogs,dispatch) => {
    const q = query(collection(db, `dialogs/${params.id}/messages`),
        limit(30),
        orderBy('createdAt', "desc"),
        startAfter(lastMessages))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
        dialogs.map(r => dispatch(additionalMessages(r)))
        const lastMessages = querySnapshot.docs[querySnapshot.docs.length - 1];
        dispatch(setLastMessages(lastMessages))
    });
}
//TODO доработать отрисовку актуального имени пользователя, если он сменил имя






export const addUserToDialogsAPI = async (params,data,setUserFound,setUserAdded) => { //функция по добавлению пользователя в беседу.
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