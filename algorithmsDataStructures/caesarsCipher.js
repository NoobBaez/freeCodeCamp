// One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

// A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

// Write a function which takes a ROT13 encoded string as input and returns a decoded string.

function rot13(str) {
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return str.split('').reduce((result, char) => {

        //edge case for no alphanumeric char
        if (/\W/.test(char)) return result += char;

        //get the index of the char from the abc<arr>
        const charIndex = abc.indexOf(char);

        if (charIndex + 14 > abc.length) {
            const offSet = charIndex + 13 - abc.length;
            return result += abc[offSet];
        } else {
            return result += abc[charIndex + 13];
        }
    }, "");
}

let value = rot13("SERR PBQR PNZC");
console.log(value)