import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { updateTimerAsync, switchTimer, resetTimer } from '../redux/actions';

const Timer = ({
    seconds,
    session,
    breaK,
    isTimerON,
    isSession,
    updateTimerAsync,
    switchTimer,
    resetTimer
}) => {

    useEffect(() => {
        if (!isTimerON) return;
        updateTimerAsync();
    }, [isTimerON, seconds, updateTimerAsync]);

    useEffect(() => {
        document.getElementById('beep').play();
    }, [isSession])

    const handleClick = (event) => {
        event.preventDefault();
        switchTimer();
    };

    const handleClickReset = event => {
        event.preventDefault();
        const beep = document.getElementById('beep');
        beep.pause();
        beep.currentTime = 0;

        resetTimer();
    };

    const stageToShow = isSession ? session : breaK;

    return (
        <div id="timer">
            <label id="timer-label">{isSession ? 'Session' : 'Break'}</label>
            <div id="time-left">{`${stageToShow}:${seconds}`}</div>
            <button id="start_stop" onClick={handleClick}>
                {isTimerON ? 'Pause' : 'Play'}</button>
            <button onClick={handleClickReset} id="reset" >Reset</button>
            <audio id="beep" src="https://sampleswap.org/samples-ghost/LOOPING%20AMBIENCE/432[kb]mellow-beeps-into-atmosphere.wav.mp3" />
        </div>
    )
};

const mapStateToProps = state => {
    let seconds = state.secondsCount.toString();
    let session = state.sessionCount.toString();
    let breaK = state.breakCount.toString();

    //add a zero infront it the unity is less than 10, 
    if (seconds.length === 1) seconds = '0' + seconds;
    if (session.length === 1) session = '0' + session;
    if (breaK.length === 1) breaK = '0' + breaK;

    return {
        seconds,
        session,
        breaK,
        isSession: state.isSession,
        isTimerON: state.isTimerON
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateTimerAsync: () => dispatch(updateTimerAsync()),
        switchTimer: () => dispatch(switchTimer()),
        resetTimer: () => dispatch(resetTimer())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);