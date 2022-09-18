import React from 'react';
import {useEffect} from "react";
import {NavbarShowDialogs} from "../Navbar/NavbarShowDialogs";
import {useDispatch} from "react-redux";

const Home = (dialogs) => {

    const dispatch = useDispatch()

    useEffect(() => {
        NavbarShowDialogs(dialogs,dispatch)
            .then(() => {

            })
    },[])

    return (
        <div>
            <div>Основная информация и новости</div>
        </div>
    );
};

export default Home;