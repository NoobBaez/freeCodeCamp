//Convert the given number into a roman numeral.
const romanN = {
    "MMM": 3000,
    "MM": 2000,
    "M": 1000,
    "CM": 900,
    "DCCC": 800,
    "DCC": 700,
    "DC": 600,
    "D": 500,
    "CD": 400,
    "CCC": 300,
    "CC": 200,
    "C": 100,
    "XC": 90,
    "LXXX": 80,
    "LXX": 70,
    "LX": 60,
    "L": 50,
    "XL": 40,
    "XXX": 30,
    "XX": 20,
    "X": 10,
    "IX": 9,
    "VIII": 8,
    "VII": 7,
    "VI": 6,
    "V": 5,
    "IV": 4,
    "III": 3,
    "II": 2,
    "I": 1
}

function convertToRoman(num) {
    const keys = Object.keys(romanN);
    const values = Object.values(romanN);

    //edge case
    if (values.includes(num)) {
        const index = values.indexOf(num);
        return keys[index];
    }

    let arr = String(num).split('');
    arr = arr.map((n, index) => {
        let zeros = arr.length - index - 1;
        for (var i = 0; i < zeros; i++) {
            n += "0";
        }
        return n
    }).filter(e => e[0] !== "0");;

    return arr
        .reduce((total, n) => {
            let index = values.indexOf(parseInt(n));
            return total += keys[index];
        }, "");
}

let value = convertToRoman(501);
console.log(value)
