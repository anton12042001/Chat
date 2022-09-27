import React from 'react';
import Navbar from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import {addDoc, collection, doc, getFirestore, updateDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import {setDialogs} from "../../reduxToolkit/slices/dialogsIdSlice";
import {NavbarSetNewDialogs} from "./NavbarSetNewDialogs";
import cl from './Navbar.module.css'


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

        const dialogsRef = doc(db, "users", id);
        let dialogsList = [...dialogs]
        dialogsList.push(docRef.id)

        await updateDoc(dialogsRef, {
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