import {doc, getDoc, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";





const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const NavbarShowDialogs = async (dialogs) => {

    let dialogsArray = dialogs.dialogs
        .map(async d => {
           let docRef = (doc(db, "dialogs", `${d}`))
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }


        } )


}

