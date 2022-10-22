import React from 'react';
import {useForm} from "react-hook-form";
import cl from './NewDialogsForm.module.css'

const NewDialogsFormPublic = (props) => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = (data) => {
        reset()
        props.createNewDialogsDB(data,false)
    }

    return (
        <div className={cl.popapContainer} >
            Создайте новый диалог!
            <div className={cl.popap} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Укажите название для будущего диалога </label>
                        <input placeholder={"Название диалога"} {...register("dialogsName")} type="text"/>
                    </div>
                    <button type={"submit"}>Создать</button>
                </form>
            </div>
        </div>
    );
};

export default NewDialogsFormPublic;