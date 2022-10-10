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
        console.log("Начинает отрабатывать")
        const q = query(collection(db, `users/${id}/dialogs`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            console.log("Отрабатывает снапшот")
            const dialogsList = [];
            querySnapshot.forEach((doc) => {
                dialogsList.push(doc.data().name);
                console.log(doc.data())
            });
            console.log("Current cities in CA: ", dialogsList);
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