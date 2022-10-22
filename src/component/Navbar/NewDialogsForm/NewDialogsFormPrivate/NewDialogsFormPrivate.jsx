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
        props.createNewDialogsDB(data,true)
    }

    return (
        <div onClick={(e) => e.stopPropagation()}  className={cl.popapContainer} >
            Создайте новый приватный диалог!
            <div className={cl.popap} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={cl.dialogsName} >
                        <label>Укажите название для будущего диалога </label>
                        <input placeholder={"Название диалога"} {...register("dialogsName")} type="text"/>
                    </div>
                    <div className={cl.dialogsUid} >
                        <label>Введите id пользователя, с которым хотите начать диалог</label>
                        <input placeholder={"id пользователя"} {...register("uidDialogs")} type="text"/>
                    </div>
                    <button type={"submit"}>Создать</button>
                </form>
            </div>
        </div>
    );
};

export default NewDialogsFormPrivate;