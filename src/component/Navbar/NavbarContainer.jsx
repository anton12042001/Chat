import React, {useEffect} from 'react';
import Navbar from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import {createDialogAPI} from "../api/dialogsAPI";
import {collection, query, where, onSnapshot, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";

const NavbarContainer = () => {

    const {id} = useSelector(state => state.user)
    const {dialogs} = useSelector(state => state.dialogs)
    const dispatch = useDispatch()

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    useEffect(() => {
        const q = query(collection(db, "/dialogs/"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const dialogsList = [];
            querySnapshot.forEach((doc) => {
                dialogsList.push(doc.data().name);
                console.log(doc.data())
            });
            console.log("Current cities in CA: ", dialogsList.join(", "));
        });
    },[])





    const createNewDialogs = async ({dialogsName}) => {
        await createDialogAPI(dialogsName,dispatch,id,dialogs)
    }


    return (
        <div>
            <Navbar createNewDialogs={createNewDialogs} />
        </div>
    );
};

export default NavbarContainer;