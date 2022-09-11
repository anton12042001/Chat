import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const {email} = useSelector(state => state.user)
    const navigate = useNavigate()


    if(!email){
        navigate('/authorization')
    }
    return (
        <div>
            fasfsa
        </div>
    );
};

export default Home;