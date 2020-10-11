import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { updateTimerAsync, switchTimer } from '../redux/actions';

const Timer = ({
    seconds,
    session,
    breaK,
    isTimerON,
    isSession,
    updateTimerAsync,
    switchTimer
}) => {

    useEffect(() => {
        if (!isTimerON) return;
        updateTimerAsync();
    }, [isTimerON, seconds, updateTimerAsync]);

    const handleClick = (event) => {
        event.preventDefault();
        switchTimer();
    }

    const stageToShow = isSession ? session : breaK;

    return (
        <div id="timer">
            <label id="timer-label">Session</label>
            <div id="time-left">{`${stageToShow}:${seconds}`}</div>
            <button id="start_stop" onClick={handleClick}>{isTimerON ? 'Pause' : 'Play'}</button>
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
        switchTimer: () => dispatch(switchTimer())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);