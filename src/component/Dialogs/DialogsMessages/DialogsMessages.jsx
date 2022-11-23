import React from 'react';
import cl from "../Dialogs.module.css"

const DialogsMessages = ({displayName,text,uid,photoURL, id,createdAt}) => {



    return (
        <div>
            <div className={cl.messagesContainer} >
                <div className={cl.messagesElement} >
                    <div className={(uid === id) ? cl.myMessage : cl.userMessage}  >
                        <div className={cl.messagesUserInfo} >
                            <div className={cl.messagesInfoName} >{displayName}</div>
                            <div className={cl.createdAt}>{createdAt}</div>
                        </div>
                        <div className={cl.messagesBody} >{text}</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DialogsMessages;