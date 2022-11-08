import {doc, getDoc, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";

export const dialogsAPIUtils = async (doc,dialogs) => {







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
}