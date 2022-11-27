import React from 'react';
import {useForm} from "react-hook-form";
import cl from './Authorization.module.css'

const FormAuthRegister = (props) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = (data) => {
        reset()
        props.signUpDB(data.email, data.password)
    }

    return (
        <form className={cl.formSignUp} onSubmit={handleSubmit(onSubmit)}>

            <div>
                <input className={cl.inputSignUpEmail}  disabled={(props.email)}  placeholder={"Введите email"}  {...register("email")} type="email"/>
            </div>
            <div>
                <input className={cl.inputSignUpPassword} disabled={(props.email)} placeholder={"Введите пароль"}  {...register("password")} type="password"/>
            </div>
            <button className={cl.buttonSignUp} disabled={(props.email)} type={"submit"}>Регистрироваться</button>
        </form>
    );
};

export default FormAuthRegister;