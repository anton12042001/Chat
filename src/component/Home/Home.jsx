import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Home = () => {


    const {email,} = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(!email){
            navigate('/authorization')
        }
    },[])





    return (
        <div>
            <div>Основная информация и новости</div>
        </div>
    );
};

export default Home;