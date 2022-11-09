import {doc, getDoc, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";

export const dialogsAPIUtils = async (docs) => {


    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    const docRef = doc(db, "users", `${docs.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {

        const dateId = docs.createdAt.seconds + docs.createdAt.nanoseconds
        let midleElement = {
            displayName: docSnap.data().displayName,
            photoURL: docs.photoURL,
            text: docs.text,
            uid: docs.uid,
            createdAt: new Date(docs.createdAt.seconds * 1000).toLocaleString(),
            idMessages: dateId

        }
        return midleElement

    }



}