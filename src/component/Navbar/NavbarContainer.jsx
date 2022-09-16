import React from 'react';
import Navbar from "./Navbar";
import {useSelector} from "react-redux";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";

const NavbarContainer = () => {

    const {id,email} = useSelector(state => state.user)
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);



//todo разобраться что тут происходит


    return (
        <div>
            <Navbar createNewDialogs={createNewDialogs} />
        </div>
    );
};

export default NavbarContainer;