//Return true if the passed string looks like a valid US phone number.

// 555-555-5555
// (555)555-5555
// (555) 555-5555
// 555 555 5555
// 5555555555
// 1 555 555 5555

function telephoneCheck(str) {
    return /^(1\s?)?(\d{3}|\(\d{3}\))[\s-]?\d{3}[\s-]?\d{4}$/.test(str);
}

let value = telephoneCheck("1 (555) 555-5555");
console.log(value);

