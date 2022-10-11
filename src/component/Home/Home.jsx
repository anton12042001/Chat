import React, {useEffect} from 'react';
import {NavbarShowDialogs} from "./NavbarShowDialogs";
import {useDispatch, useSelector} from "react-redux";

const Home = (dialogs) => {
    const {dialogsForShow} = useSelector(state => state.showDialogs)
    const dispatch = useDispatch()

    useEffect(() => {
        NavbarShowDialogs(dialogs.dialogs,dispatch,dialogsForShow)
    },[])

    return (
        <div>
            <div>Основная информация и новости</div>
        </div>
    );
};

export default Home;