function checkCashRegister(price, cash, cid) {

    let currency = cid.reverse().map((c, index) => {
        const values = [
            ['ONE HUNDRED', 100],
            ['TWENTY', 20],
            ['TEN', 10],
            ['FIVE', 5],
            ['ONE', 1],
            ['QUARTER', 0.25],
            ['DIME', 0.1],
            ['NICKEL', 0.05],
            ['PENNY', 0.01]
        ];
        //Currency Unit / Quantity / Amount
        //TWENTY          60         20
        return c.concat(values[index][1]);
    })

    //change goal
    let amountToChange = cash - price;

    const change = currency.reduce((result, currency) => {
        //if the goal change have been met return the known result
        if (amountToChange === 0) return result;

        //value/amount that will be used for each currency unit
        let value = 0;

        if (amountToChange - currency[2] >= 0) {

            //If the there is currency available
            while (currency[1] > 0 && amountToChange - currency[2] >= 0) {
                amountToChange -= currency[2];
                value += currency[2];
                currency[1] -= currency[2];

                //floating point precision
                currency[1] = Math.round(currency[1] * 100) / 100;
                amountToChange = Math.round(amountToChange * 100) / 100;
            }
            return result.concat([[currency[0], value]])
        }
        return result;
    }, []);

    //with cash-in-drawer as the value for the key change if it is equal to the change due.
    const isClosed = currency.reduce((a, b) => { return a + b[1] }, 0) === amountToChange;

    if (isClosed) {
        return { status: "CLOSED", change: cid.reverse() }
    } else if (amountToChange > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] }
    } else {
        return { status: "OPEN", change }
    }
}

let value = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])

console.log(value);

