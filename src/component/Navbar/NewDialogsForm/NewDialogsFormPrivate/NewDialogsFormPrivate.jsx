import React from 'react';
import {useForm} from "react-hook-form";
import cl from './NewDialogsFormPrivate.module.css'

const NewDialogsFormPrivate = (props) => {

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
        <div onClick={(e) => e.stopPropagation()}  className={cl.popapContainer} >
            Создайте новый приватный диалог!
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

export default NewDialogsFormPrivate;