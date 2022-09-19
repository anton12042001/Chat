import React from 'react';
import {useParams} from "react-router-dom"

const DialogsContainer = () => {
const params = useParams()
console.log(params)

    return (
        <div>
            Диалог
        </div>
    );
};

export default DialogsContainer;