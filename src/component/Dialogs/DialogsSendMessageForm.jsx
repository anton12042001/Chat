import React from 'react';
import {useForm} from "react-hook-form";
import cl from './Dialogs.module.css'

const DialogsSendMessageForm = (props) => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();


    const onSubmit = (data) => {
        reset()
        props.createMessage(data)
    }

    return (
        <form className={cl.sendMessage} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea {...register("body")}/>
            </div>
            <button type={"submit"}>Отправить сообщение</button>
        </form>
    );
};

export default DialogsSendMessageForm;