import React from 'react';
import Timer from "../../utils/Timer";

const SendMessageToMailTimer = (props) => {

    return (
        <div>
            <button onClick={props.verificationMail} disabled={props.timer} >Прислать письмо еще раз</button>
            <Timer
                setSeconds={props.setSeconds}
                seconds={props.seconds}
                setTimerActive={props.setTimerActive}
                timerActive={props.timerActive}
                setTimer={props.setTimer}
            />
        </div>
    );
};

export default SendMessageToMailTimer;