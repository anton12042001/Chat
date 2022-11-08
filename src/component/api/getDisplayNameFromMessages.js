import {doc, getDoc, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";

export const getDisplayNameFromMessages = async () => {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);



    const docRef = doc(db, "users", `${doc.data().uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    }
}