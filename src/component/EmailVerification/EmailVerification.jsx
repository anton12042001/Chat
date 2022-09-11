
import React from 'react';
import {useNavigate} from "react-router-dom";
import SendMessageToMailTimer from "./SendMessageToMailTimer/SendMessageToMailTimer";

const EmailVerification = (props) => {

    const navigate = useNavigate()

    const redirectToLogin = () => {
        navigate('/authorization')
    }
    return (
        <div>
            <div>На вашу электронную почту было отправлено письмо. Подтвердите, пожалуйста, свою почту.</div>
            <div>Если письмо не пришло автоматически, то отправьте его самостоятельно, нажав на кнопку ниже</div>
            <SendMessageToMailTimer {...props}/>
            <div>
                {props.sendMessageToMail && <div>Письмо успешно отправлено</div>}
            </div>
            <div>
                <button onClick={redirectToLogin}>Перейти к авторизации</button>
            </div>
        </div>
    );
};

export default EmailVerification;