//substitute simple calculation (number operator number) and evaluate the answer
function evaluate(_expression, p1, _decimal, operator, p2) {
    switch (operator) {
        case '+':
            return Number(p1) + Number(p2);
        case '-':
            return Number(p1) - Number(p2);
        case 'x':
            return Number(p1) * Number(p2);
        case '/':
            return Number(p1) / Number(p2);
        default:
            throw new SyntaxError(`${operator} is a invalid operator.`);
    }
};

function convert(str) {
    return str.replace(/(-?\d+(\.\d+)?)([+\-x/])(-?\d+(\.\d+)?)/, evaluate);
};

//after multiplication and division has been completed, add or subtract
const formulaLogic = (str) => {
    const divideRegx = /(-?\d+(\.\d+)?\/-?\d+(\.\d+)?)/
    const multiplyRegx = /(-?\d+(\.\d+)?\x-?\d+(\.\d+)?)/
    const subtractRegx = /(-?\d+(\.\d+)?--?\d+(\.\d+)?)/
    const addRegx = /(-?\d+(\.\d+)?\+-?\d+(\.\d+)?)/;

    //do all divicion if any
    while (divideRegx.test(str)) {
        str = str.replace(divideRegx, convert)
    };

    //do all multiplication if any
    while (multiplyRegx.test(str)) {
        str = str.replace(multiplyRegx, convert)
    };

    //do all subtraction if any
    while (subtractRegx.test(str)) {
        str = str.replace(subtractRegx, convert)
    };

    //do all addition if any
    while (addRegx.test(str)) {
        str = str.replace(addRegx, convert)
    };
    
    return str;
};


export default formulaLogic;