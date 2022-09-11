import React, {useEffect} from 'react'

const Timer = (props) => {

    useEffect(() => {
        if (props.seconds > 0 && props.timerActive) {
            setTimeout(props.setSeconds, 1000, props.seconds - 1);
        } else {
            props.setTimerActive(false);
            (props.setSeconds(60))
            props.setTimer(false)
        }
    }, [ props.seconds, props.timerActive ]);

    return (
        <div>
            {props.seconds && props.seconds !== 60
                ? <>
                    <div>Повторить отправку можно через: {props.seconds}</div>
                </>
                : <div></div>

            }
        </div>
    );
}

export default Timer;