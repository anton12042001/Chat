import React from 'react';
import {useForm} from "react-hook-form";
import cl from './DialogsAddUserPopap.module.css'

const DialogsAddUserPopap = ({setVisiblePopap}) => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();


    const onSubmit = (data) => {
        reset()
    }

    return (
        <div className={cl.formContainer} >
            <form onClick={() => setVisiblePopap(false)}  className={cl.form} onSubmit={handleSubmit(onSubmit)}>
                <div onClick={(e) => e.stopPropagation()} className={cl.imputButton} >
                    <div className={cl.input} >
                        Введите id пользователя, которого хотите добавить
                        <input  {...register("userId")}/>
                    </div>
                    <button type={"submit"}>Добавить пользователя</button>
                </div>
            </form>
        </div>
    );
};

export default DialogsAddUserPopap;