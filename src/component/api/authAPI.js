import { getAuth, signInWithEmailAndPassword, sendEmailVerification} from "firebase/auth";



export const loginAPI = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
}

export const sendMessagesAPI = () => {
    const auth = getAuth();
    return sendEmailVerification(auth.currentUser)
}
