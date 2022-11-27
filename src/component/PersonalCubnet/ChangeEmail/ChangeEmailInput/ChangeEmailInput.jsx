import React from 'react';
import {useForm} from "react-hook-form";
import cl from './ChangeEmailInput.module.css'

const ChangeEmailInput = (props) => {


    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        props.changeEmail(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Е-mail" className={cl.changeEmailInput} {...register("email")} type="email"/>
            <button className={cl.saveShangeEmailButton}  type={"submit"}>Сохранить</button>
        </form>
    );
};

export default ChangeEmailInput;