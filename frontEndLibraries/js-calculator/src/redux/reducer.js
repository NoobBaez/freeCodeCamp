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
        value: 'X'
    },
    {
        id: 'divide',
        value: '/'
    },
    {
        id: 'clean',
        value: 'AC'
    }
];

const initState = {
    pads,
    expression: '',
    value: 0,
    total: 0
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
                    value: 0
                }
            } else {
                return {
                    ...state,
                    expression: state.expression + action.value,
                    value: action.value
                }
            };
        case SET_TOTAL:
            // const total = expression.split('').reduce((count, element) => {
            //     if(parseInt(element)) return 
            // }, 0);
            
            return state;


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

export default reducer;