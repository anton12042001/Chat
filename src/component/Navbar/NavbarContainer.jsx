import React, {useEffect} from 'react';
import Navbar from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import {createDialogAPI, NavbarDialogsObserverAPI} from "../api/dialogsAPI";

const NavbarContainer = () => {

    const {id} = useSelector(state => state.user)
    const {dialogs} = useSelector(state => state.dialogs)
    const {dialogsForShow} = useSelector(state => state.showDialogs)
    const dispatch = useDispatch()

    useEffect(() => {
        NavbarDialogsObserverAPI(dialogs,id,dispatch,dialogsForShow)
    }, [dialogs])





    const createNewDialogs = async ({dialogsName}) => {
        debugger
        await createDialogAPI(dialogsName, dispatch, id, dialogs)
    }


    return (
        <div>
            <Navbar createNewDialogs={createNewDialogs}/>
        </div>
    );
};

export default NavbarContainer;