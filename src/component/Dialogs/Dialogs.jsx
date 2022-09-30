import React, {useEffect, useRef} from 'react';
import cl from "./Dialogs.module.css"
import DialogsSendMessageForm from "./DialogsSendMessageForm";
import DialogsMessages from "./DialogsMessages";
import {useSelector} from "react-redux";


const Dialogs = ({sendMessage,messages,loading}) => {


    const {id} = useSelector(state => state.user)
    const fieldRef = useRef(null)


    useEffect(() => {
        if(<DialogsSendMessageForm/> && fieldRef.current ){
            console.log(fieldRef.current)
            fieldRef.current.scrollIntoView(false)
        }
    },[loading])

    const createMessage = (data) => {
        sendMessage(data.body)
    }



    return (
        <div className={cl.container}>
            <div>
                {messages.map(m => <DialogsMessages displayName={m.displayName} text={m.text} uid={m.uid} id={id}
                                                    photoURL={m.photoURL}/>)}
            </div>

            <div ref={fieldRef} >
                <DialogsSendMessageForm createMessage={createMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;