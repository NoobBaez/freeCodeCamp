// Return true if the given string is a palindrome. Otherwise, return false.

// A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

function palindrome(str) {
    str = str
        .replace(/[\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>]/g, "")
        .toLowerCase()
        .split('');

    let reverseStr = [...str]
        .reverse()
        .join('');

    return str.join('') === reverseStr;
}

let value = palindrome('My age is 0, 0 si ega ym.');
console.log(value);
