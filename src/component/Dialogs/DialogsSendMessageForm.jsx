import React from 'react';
import {useForm} from "react-hook-form";

const DialogsSendMessageForm = (props) => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();


    const onSubmit = (data) => {
        debugger
        reset()
        props.createMessage(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea {...register("body")}/>
            </div>
            <button type={"submit"}>Отправить сообщение</button>
        </form>
    );
};

export default DialogsSendMessageForm;