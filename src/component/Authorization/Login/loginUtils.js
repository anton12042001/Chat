import {doc, getDoc, getFirestore} from "firebase/firestore";
import {setDocumentAPI, updateDocumentAPI, updateDocumentDialogsAPI} from "../../../api/firestoreDocumentAPI";

import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../../firebase";
import {setDialogs} from "../../../reduxToolkit/slices/dialogsIdSlice";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export const setUsersInFirestore = async (displayName, email, uid) => { //Добавления юзера в базу данных
    const docRef = doc(db, "users", `${uid}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        setDocumentAPI(displayName, email, uid) //Если нет юзера - сетит
    } else {
        await updateDocumentAPI(displayName, email, uid)  //Если юзер есть, то обновляет id, email, displayName

        const docRef = doc(db, "users", `${uid}`);
        const docSnap = await getDoc(docRef);
        docSnap.exists() && updateDocumentDialogsAPI(docSnap.data().dialogs, uid) //Если юзер есть, то обновляет dialogsId
    }
}




export const getDialogs = async (uid, dispatch) => {
    const docRef = doc(db, "users", `${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        dispatch(setDialogs(docSnap.data().dialogs)) //Сетит в стейт id диалога
    } else {
        console.log("Нет данных");
    }
}