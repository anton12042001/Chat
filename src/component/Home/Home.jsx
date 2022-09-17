import React from 'react';
import {useEffect} from "react";
import {NavbarShowDialogs} from "../Navbar/NavbarShowDialogs";

const Home = (dialogs) => {

    useEffect(() => {
        NavbarShowDialogs(dialogs)
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