import React, {useEffect} from 'react';
import Navbar from "./Navbar";
import {useSelector} from "react-redux";
import {addDoc, collection, getFirestore, } from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";


const NavbarContainer = () => {

    const {id} = useSelector(state => state.user)
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);




    const createNewDialogs = async ({dialogsName}) => {
        const docRef = await addDoc(collection(db, "dialogs"), {
            dialogsName:dialogsName,
            admin: id,
            users: id
        });

    }


    return (
        <div>
            <Navbar createNewDialogs={createNewDialogs} />
        </div>
    );
};

export default NavbarContainer;