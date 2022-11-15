import {getAuth, updateProfile} from "firebase/auth";
import {doc, getFirestore, updateDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebase";


const auth = getAuth();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const changeFullNameAPI = async (data,id) => {
    const displayNameRef = doc(db, "users", `${id}`);
    await updateDoc(displayNameRef, {
        displayName: data
    });

    return updateProfile(auth.currentUser, {
        displayName: `${data.displayName}`
    })
}