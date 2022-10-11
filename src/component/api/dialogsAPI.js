import {addDoc, collection, doc, getFirestore, updateDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import {setDialogs} from "../../reduxToolkit/slices/dialogsIdSlice";
import {NavbarSetNewDialogs} from "../Navbar/NavbarSetNewDialogs";


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
    await NavbarSetNewDialogs(docRef.id,dispatch)
}