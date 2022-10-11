import React, {useEffect} from 'react';
import Navbar from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import {createDialogAPI} from "../api/dialogsAPI";
import {doc, getFirestore, onSnapshot} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase";
import {removeDialogs, setDialogs} from "../../reduxToolkit/slices/dialogsIdSlice";

const NavbarContainer = () => {

    const {id} = useSelector(state => state.user)
    const {dialogs} = useSelector(state => state.dialogs)

    const dispatch = useDispatch()

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);








    
//todo доработать вывод нового диалога, если юзера туда добавили


    useEffect(() => {
        NavbarDialogsObserver(dialogs, id)
    }, [dialogs])


    const NavbarDialogsObserver = (dialogs, id) => {
        debugger
        if (dialogs && id) {
            const unsub = onSnapshot(doc(db, `users/${id}`), async (doc) => {
                debugger
                if (doc.data().dialogs.length > dialogs.length) {
                    dispatch(removeDialogs())
                    dispatch(setDialogs(doc.data().dialogs))
                }
            });
        }
    }

    //todo доработать вывод нового диалога, если юзера туда добавили








    const createNewDialogs = async ({dialogsName}) => {
        await createDialogAPI(dialogsName, dispatch, id, dialogs)
    }


    return (
        <div>
            <Navbar createNewDialogs={createNewDialogs}/>
        </div>
    );
};

export default NavbarContainer;