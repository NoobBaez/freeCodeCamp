import formulaLogic from '../formulaLogin';

const pads = [
    {
        id: 'zero',
        value: 0
    },
    {
        id: 'one',
        value: 1
    },
    {
        id: 'two',
        value: 2
    },
    {
        id: 'three',
        value: 3
    },
    {
        id: 'four',
        value: 4
    },
    {
        id: 'five',
        value: 5
    },
    {
        id: 'six',
        value: 6
    },
    {
        id: 'seven',
        value: 7
    },
    {
        id: 'eight',
        value: 8
    },
    {
        id: 'nine',
        value: 9
    },
    {
        id: 'add',
        value: '+'
    },
    {
        id: 'subtract',
        value: '-'
    },
    {
        id: 'equals',
        value: '='
    },
    {
        id: 'decimal',
        value: '.'
    },
    {
        id: 'multiply',
        value: 'x'
    },
    {
        id: 'divide',
        value: '/'
    },
    {
        id: 'clear',
        value: 'AC'
    }
];

const initState = {
    pads,
    expression: '',
    number: '',
}

const SET_VALUE = 'SET_VALUE';
const SET_TOTAL = 'GET_TOTAL';

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case SET_VALUE:
            if (action.value === 'AC') {
                return {
                    ...state,
                    expression: '',
                    number: ''
                }
            } else {
                let expression = state.expression;
                let number = state.number;

                //operates on the result of the previous evaluation
                if (/=/.test(expression)) expression = number;

                //not allow a number to begin with multiple zeros
                if (action.value === 0 && number === '0') return state;

                if (['+', 'x', '/', '-'].includes(expression[expression.length - 1])) {

                    if (expression[expression.length - 1] === '-' && action.value === '-') return state;

                    if (/[x\/+]/.test(action.value)) {
                        //find the operator's index
                        let indexToEliminate = expression.search(/[/\+x]/)

                        return {
                            ...state,
                            expression: expression.slice(0, indexToEliminate) + action.value,
                            number: ''
                        };
                    }

                }

                //reset the number state when a operator is introduce
                if (['+', '-', 'x', '/'].includes(action.value)) {
                    return {
                        ...state,
                        expression: expression + action.value,
                        number: ''
                    }
                };

                //two "." in one number should not be accepted
                if (/\./.test(number) && action.value === '.') return state;

                return {
                    ...state,
                    expression: expression + action.value,
                    number: number + action.value
                };
            };
        case SET_TOTAL:
            const total = formulaLogic(state.expression);
            return {
                ...state,
                expression: total,
                value: total
            };
        default:
            return state;
    }
};

export const setValue = value => {
    return {
        type: SET_VALUE,
        value
    }
}

export const setTotal = () => {
    return {
        type: SET_TOTAL
    }
};

export default reducer;