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
            <form onClick={() => setVisiblePopap(false)} className={cl.form} onSubmit={handleSubmit(onSubmit)}>
                <div onClick={(e) => e.stopPropagation()} className={cl.inputButton} >
                    <div className={cl.input} >
                        <div className={cl.titleInput}>Введите id  пользователя </div>
                        <input placeholder='XXX-XXX-XX'  {...register("userId")}/>
                        {userFound && <div>Данный пользователь уже есть в этой беседе</div>}
                        {userAdded && <div>Пользователь успешно добавлен</div>}
                    </div>
                    <button className={cl.addUserButton} type={"submit"}>Добавить</button>
                </div>
            </form>
        </div>
    );
};

export default DialogsAddUserPopap;