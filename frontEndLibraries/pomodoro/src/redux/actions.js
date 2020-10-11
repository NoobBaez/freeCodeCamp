export const UPDATE_TIMER = 'UPDATE_TIMER';
export const SWITCH_TIMER = 'SWITCH_TIMER';
export const INCREMENT_LENGTH = 'INCREMENT_LENGTH';
export const DECREMENT_LENGTH = 'DECREMENT_LENGTH';
export const RESET_TIMER = 'RESET_TIMER';

const updateTimer = () => {
    return {
        type: UPDATE_TIMER,
    }
};

export const updateTimerAsync = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(updateTimer());
        }, 1000);
    };
};

export const switchTimer = () => {
    return {
        type: SWITCH_TIMER,
    }
};

export const incrementLength = stage => {
    return {
        type: INCREMENT_LENGTH,
        stage
    }
};

export const decrementLength = stage => {
    return {
        type: DECREMENT_LENGTH,
        stage
    }
};

export const resetTimer = () => {
    return {
        type: RESET_TIMER
    }
};