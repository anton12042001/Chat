import React from 'react';
import cl from "./Dialogs.module.css"
import DialogsSendMessageForm from "./DialogsSendMessageForm";
import {useSelector} from "react-redux";

const Dialogs = ({isMessages,sendMessage}) => {



    const createMessage = (data) => {
        sendMessage(data.body)
    }

    return (
        <div >
            <div className={cl.dialogsWindow} >{isMessages && <div>В этом диалоге пока нет сообщений.</div>}</div>
            <DialogsSendMessageForm createMessage={createMessage} />
        </div>
    );
};

export default Dialogs;