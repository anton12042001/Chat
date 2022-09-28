import React, {useEffect} from 'react';
import cl from "./Dialogs.module.css"

const DialogsMessages = ({displayName,text,uid,photoURL, id}) => {



    return (
        <div>
            <div className={cl.messagesContainer} >
                <div className={cl.messagesElement} >
                    <div className={(uid === id) ? cl.myMessage : cl.userMessage}  >
                        <div>{displayName}</div>
                        <div>{text}</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DialogsMessages;