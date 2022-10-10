import React from 'react';
import {useForm} from "react-hook-form";
import cl from './DialogsAddUserPopap.module.css'
import {useParams} from "react-router-dom";

const DialogsAddUserPopap = ({setVisiblePopap,addUserToDialogs,userFound,userAdded}) => {

    const params = useParams()
    const {
        register,
        handleSubmit,
        reset
    } = useForm();


    const onSubmit = (data) => {
        reset()
        addUserToDialogs(params,data)
    }

    return (
        <div className={cl.formContainer} >
            <form onClick={() => setVisiblePopap(false)}  className={cl.form} onSubmit={handleSubmit(onSubmit)}>
                <div onClick={(e) => e.stopPropagation()} className={cl.imputButton} >
                    <div className={cl.input} >
                        Введите id пользователя, которого хотите добавить
                        <input  {...register("userId")}/>
                        {userFound && <div>Данный пользователь уже есть в этой беседе</div>}
                        {userAdded && <div>Пользователь успешно добавлен</div>}
                    </div>
                    <button type={"submit"}>Добавить пользователя</button>
                </div>
            </form>
        </div>
    );
};

export default DialogsAddUserPopap;