import React from 'react';
import Home from "./Home";
import {useSelector} from "react-redux";
import Loader from "../UI/Loader";
import {useNavigate} from "react-router-dom";

const HomeContainer = () => {
    const {dialogs} = useSelector(state => state.dialogs)
    const {email} = useSelector(state => state.user)
    const navigate = useNavigate()

    if(!email){
        navigate("/authorization")
    }


    if(!dialogs) {
        return <Loader/>
    }

    return (
        <div>
            <Home dialogs={dialogs}/>
        </div>
    );
};

export default HomeContainer;