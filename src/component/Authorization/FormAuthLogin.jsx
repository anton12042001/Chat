import React from "react";
import { useForm } from "react-hook-form";
import cl from './Authorization.module.css'


const FormAuthLogin = (props) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = (data) => {
        reset()
        props.loginDB(data.email, data.password)
    }

    return (
        <div className={cl.authFormLogin} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input placeholder={"Введите email"} {...register("email")} type="email"/>
                </div>
                <div>
                    <input  placeholder={"Введите пароль"} {...register("password")} type="password"/>
                </div>
                <button type={"submit"}>Войти</button>
            </form>
        </div>
    );
};

export default FormAuthLogin;