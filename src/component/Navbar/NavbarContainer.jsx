import React from 'react';
import Navbar from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import {createDialogAPI} from "../api/dialogsAPI";


const NavbarContainer = () => {

    const {id} = useSelector(state => state.user)
    const {dialogs} = useSelector(state => state.dialogs)
    const dispatch = useDispatch()






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