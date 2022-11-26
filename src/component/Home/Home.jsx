import React, {useEffect} from 'react';
import {NavbarShowDialogs} from "./NavbarShowDialogs";
import {useDispatch, useSelector} from "react-redux";
import cl from './Home.module.css'

const Home = (dialogs) => {
    const {dialogsForShow} = useSelector(state => state.showDialogs)
    const dispatch = useDispatch()

    useEffect(() => {
        NavbarShowDialogs(dialogs.dialogs,dispatch,dialogsForShow)
    },[])

    return (
        <div className={cl.home} >
            <div className={cl.news} >Новости</div>
            <div className={cl.newsItem} >Тут пока нет новых новостей</div>
        </div>
    );
};

export default Home;