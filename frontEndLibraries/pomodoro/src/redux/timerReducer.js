import { UPDATE_TIMER, SWITCH_TIMER } from './actions'

const initState = {
    sessionCount: 2,
    breakCount: 1,
    secondsCount: 60,
    legth: {
        session: 2,
        break: 1,
    },
    isTimerON: false,
    isSession: true
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_TIMER:
            let nextSecond = state.secondsCount - 1;
            let nextSession = state.sessionCount;
            let nextBreak = state.breakCount;
            let nextIsSession = state.isSession;

            if (state.secondsCount === 0) {
                //reset seconds (completed cycle)
                nextSecond = 59;

                // if the timer is on Session stage reduce it's value
                if (nextIsSession) {
                    nextSession--;
                } else {
                    nextBreak--;
                };

                //if the session is over reset it's value go for break
                // until break is done, reset it's value go for session and repeat the process
                if (state.sessionCount === 0) {
                    nextSession = state.legth.session;
                    nextIsSession = !nextIsSession;
                } else if (state.breakCount === 0) {
                    nextBreak = state.legth.break;
                    nextIsSession = !nextIsSession;
                };
            };

            return {
                ...state,
                sessionCount: nextSession,
                breakCount: nextBreak,
                secondsCount: 0 + nextSecond,
                isSession: nextIsSession,
            };
        case SWITCH_TIMER:
            return {
                ...state,
                isTimerON: !state.isTimerON
            };
        default:
            return state;
    };
};

export default reducer;