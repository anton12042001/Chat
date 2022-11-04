import React from 'react';
import cl from '../Dialogs.module.css'
import {useForm} from "react-hook-form";

const DialogsPopapDeleteUserForm = () => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = (data) => {
        reset()
    }

    return (
        <div className={cl.deleteUserForm} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input placeholder={"Введите id пользователя"} {...register("userId")} type="text"/>
                </div>
                <button type={"submit"}>Войти</button>
            </form>
        </div>
    );
};

export default DialogsPopapDeleteUserForm;