import { getAuth, signInWithEmailAndPassword, sendEmailVerification,reauthenticateWithCredential,EmailAuthProvider} from "firebase/auth";



export const loginAPI = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
}

export const sendMessagesAPI = () => {
    const auth = getAuth();
    return sendEmailVerification(auth.currentUser)
}

export const reAuthAPI = (data) => {
    const credential = EmailAuthProvider.credential( data.email, data.password)
    const user = getAuth().currentUser;
    return reauthenticateWithCredential(user, credential)
}
