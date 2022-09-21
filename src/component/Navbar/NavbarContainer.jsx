import React, {useEffect} from 'react';
import Navbar from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import {addDoc, collection, getFirestore,doc, updateDoc  } from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import {setDialogs} from "../../reduxToolkit/slices/dialogsIdSlice";
import {NavbarShowDialogs} from "../Home/NavbarShowDialogs";
import {NavbarSetNewDialogs} from "./NavbarSetNewDialogs";



const NavbarContainer = () => {

    const {id} = useSelector(state => state.user)
    const {dialogs} = useSelector(state => state.dialogs)
    const {dialogsForShow} = useSelector(state => state.showDialogs)
    const dispatch = useDispatch()

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);





    const createNewDialogs = async ({dialogsName}) => {
        const docRef = await addDoc(collection(db, "dialogs"), {
            admin:id,
            dialogsName:dialogsName,
            users:id,
        })

        const washingtonRef = doc(db, "users", id);
        let dialogsList = [...dialogs]
        dialogsList.push(docRef.id)

        await updateDoc(washingtonRef, {
            dialogs:dialogsList
        });
        dispatch(setDialogs(dialogsList))
        await NavbarSetNewDialogs(docRef.id,dispatch)






        console.log(docRef.id)
    }


    return (
        <div>
            <Navbar createNewDialogs={createNewDialogs} />
        </div>
    );
};

export default NavbarContainer;