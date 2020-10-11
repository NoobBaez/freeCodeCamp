import { UPDATE_TIMER, SWITCH_TIMER, INCREMENT_LENGTH, DECREMENT_LENGTH, RESET_TIMER } from './actions'

const initState = {
    sessionCount: 25,
    breakCount: 5,
    secondsCount: 0,
    length: {
        session: 25,
        break: 5,
    },
    isTimerON: false,
    isSession: true
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_TIMER:
            //continue if the timer is running and no pause
            if(!state.isTimerON) return state;

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
                    nextSession = state.length.session;
                    nextIsSession = !nextIsSession;
                } else if (state.breakCount === 0) {
                    nextBreak = state.length.break;
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
        case INCREMENT_LENGTH:
            let nextSessionLength = action.stage === 'session' ? state.length.session + 1 : state.length.session;
            let nextBreakLength = action.stage === 'break' ? state.length.break + 1 : state.length.break;

            //avoid set length greater than 60
            if (nextSessionLength > 60) {
                nextSessionLength = 60;
            } else if (nextBreakLength > 60) {
                nextBreakLength = 60
            };
            return {
                ...state,
                sessionCount: nextSessionLength,
                breakCount: nextBreakLength,
                length: {
                    session: nextSessionLength,
                    break: nextBreakLength,
                }
            };

        case DECREMENT_LENGTH:
            {
                let nextSessionLength = action.stage === 'session' ? state.length.session - 1 : state.length.session;
                let nextBreakLength = action.stage === 'break' ? state.length.break - 1 : state.length.break;

                //avoid set length greater than 60
                if (nextSessionLength < 1) {
                    nextSessionLength = 1;
                } else if (nextBreakLength < 1) {
                    nextBreakLength = 1
                };
                return {
                    ...state,
                    sessionCount: nextSessionLength,
                    breakCount: nextBreakLength,
                    length: {
                        session: nextSessionLength,
                        break: nextBreakLength,
                    }
                };
            }
        case RESET_TIMER:
            return initState;
        default:
            return state;
    };
};

export default reducer;