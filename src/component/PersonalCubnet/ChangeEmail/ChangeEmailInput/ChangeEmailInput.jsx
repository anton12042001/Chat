import React from 'react';
import {useForm} from "react-hook-form";

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
            <input {...register("email")} type="email"/>
            <button type={"submit"}>Сохранить</button>
        </form>
    );
};

export default ChangeEmailInput;