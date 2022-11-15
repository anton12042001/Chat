import {doc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebase";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const setDocumentAPI = (displayName,email,uid) => {
    setDoc(doc(db, "users", `${uid}`), {
        dialogs:null,
        displayName:displayName,
        email:email,
        id:uid,
    })
}

export const updateDocumentAPI = (displayName,email,uid) => {
    const updateProfile = doc(db, "users", `${uid}`);
     updateDoc(updateProfile, {
        displayName:displayName,
        email:email,
        id:uid,
    });
}
export const updateDocumentDialogsAPI = (dialogsId,uid) => {
    const updateProfile = doc(db, "users", `${uid}`);
    updateDoc(updateProfile, {
        dialogs:dialogsId
    });
}