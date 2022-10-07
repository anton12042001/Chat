import {addDoc, collection, getFirestore, serverTimestamp} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const setMessagesAPI = async (params, body, photoURL, displayName, id) => {
    let date = serverTimestamp()
    console.log(date)
    try {
        debugger
        const docRef = await addDoc(collection(db, `dialogs/${params.id}/messages`), {
            uid: id,
            displayName: displayName,
            photoURL: photoURL,
            text: body,
            createdAt: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}