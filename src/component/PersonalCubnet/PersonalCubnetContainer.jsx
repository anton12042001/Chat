import React from 'react';
import PersonalCubnet from "./PersonalCubnet";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const PersonalCubnetContainer = () => {

    const {email,id,displayName,photoURL} = useSelector(state => state.user)
    const navigate = useNavigate()


    if(!email){
        navigate('/authorization')
    }

    return (
        <div>
            <PersonalCubnet email={email} id={id} displayName={displayName} photoURL={photoURL} />
        </div>
    );
};

export default PersonalCubnetContainer;