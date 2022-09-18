import {doc, getDoc, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import {setDialogsForShow, setDialogsIdForShow} from "../../reduxToolkit/slices/showDialogs";





const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const NavbarShowDialogs = async (dialogs,dispatch) => { //Функция для получения всех диалогов, в которых состоит юзер
    let dialogsArray = dialogs.dialogs
        .map(async d => {
           let docRef = (doc(db, "dialogs", `${d}`))
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log(docSnap.data());
                console.log(d)
                dispatch(setDialogsForShow(docSnap.data()))
                dispatch(setDialogsIdForShow(d))
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        } )
}

