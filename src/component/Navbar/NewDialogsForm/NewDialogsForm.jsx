import React from 'react';
import {useForm} from "react-hook-form";
import cl from './NewDialogsForm.module.css'

const NewDialogsForm = (props) => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = (data) => {
        reset()
        props.setNewDialogsDB(data)
    }

    return (
        <div className={cl.popap} >
            Создайте новый диалог!
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input placeholder={"Название диалога"} {...register("dialogsName")} type="text"/>
                </div>
                <button type={"submit"}>Создать</button>
            </form>
        </div>
    );
};

export default NewDialogsForm;