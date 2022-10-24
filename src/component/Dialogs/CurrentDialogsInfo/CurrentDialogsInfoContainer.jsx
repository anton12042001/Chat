import React from 'react';
import CurrentDialogsInfo from "./CurrentDialogsInfo";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {setCurrentDialogs} from "../../../reduxToolkit/slices/showDialogs";

const CurrentDialogsInfoContainer = () => {

    const {dialogsForShow} = useSelector(state => state.showDialogs)
    const params = useParams()
    const dispatch = useDispatch()


    for(let i = 0; i < dialogsForShow.length; i++){
        if( dialogsForShow[i].id === params.id){
            dispatch(setCurrentDialogs(dialogsForShow[i]))
        }
    }

    return (
        <div>
            <CurrentDialogsInfo/>
        </div>
    );
};

export default CurrentDialogsInfoContainer;