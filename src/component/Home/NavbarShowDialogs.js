import {doc, getDoc, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import {setDialogsForShow} from "../../reduxToolkit/slices/showDialogs";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const NavbarShowDialogs = async (dialogs, dispatch, dialogsForShow) => { //Функция для получения всех диалогов, в которых состоит юзер
    debugger
    dialogs.map(async id => {
        let docRef = (doc(db, "dialogs", `${id}`))
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let dialogsInfo = {
                info: docSnap.data(),
                id: docSnap.id
            }
            if(dialogsForShow.length === 0) {
                dispatch(setDialogsForShow(dialogsInfo))
            }
        }
    })
}

