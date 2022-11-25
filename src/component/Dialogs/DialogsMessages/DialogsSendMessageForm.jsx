import React from 'react';
import {useForm} from "react-hook-form";
import cl from '../Dialogs.module.css'
import sendMessage from '../../../img/dialogs/sendMessageButton.svg'

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
        <form className={cl.sendMessageForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={cl.textareaContainer} >
                <textarea placeholder={"Напишите сообщение..."} className={cl.textArea}  {...register("body")}/>
                <div className={cl.sendMessage} >
                    <button className={cl.buttonSendMessage} type={"submit"}>
                        <img src={sendMessage} alt=""/>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default DialogsSendMessageForm;