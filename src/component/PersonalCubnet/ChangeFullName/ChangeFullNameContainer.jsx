import React from 'react';
import ChangeFullName from "./ChangeFullName";
import cl from './ChangeFullName.module.css'
import {changeFullNameAPI} from "../../../api/personalDataAPI";
import {useDispatch} from "react-redux";
import {changeNameUsers} from "../../../reduxToolkit/slices/userSlice";

const ChangeFullNameContainer = ({id,displayName}) => {
    const dispatch = useDispatch()


    const changeName = (data) => {
        changeFullNameAPI(data,id)
            .then(() => {
                dispatch(changeNameUsers(data))
            })
    }


    return (
        <div className={cl.containertChangeName} >
            <ChangeFullName changeName={changeName} displayName={displayName} />
        </div>
    );
};

export default ChangeFullNameContainer;