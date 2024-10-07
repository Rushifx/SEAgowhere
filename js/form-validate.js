// Function to validate email using regex 
function isEmail(value){
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value);
}

// Function to validate empty values
function isEmpty(value){
    return value === "";
}

// Function only allows specific characters (as described in the regex)
function isValidMsg(value){
    const msgRegex = /^[a-zA-Z0-9\s.,!?'"-]*$/;     // reject special characters that may allow code injections scripts / sql injections
    return msgRegex.test(value);
}

// Function to validate singapore phone numbers
function isValidNumber(value){
    const numRegex = /^[689]\d{7}$/;
    return numRegex.test(value);
}

// Function to validate singapore zip codes
function isValidZip(value){
    const zipRegex = /^\d{6}$/;
    return zipRegex.test(value);
}

// Function to validate generic card number
function isValidCard(value){
    const cardRegex = /^(\d{4}[-\s]?){3}\d{4}$/;
    return cardRegex.test(value);
}

// Function to validate valid date format
function isValidDate(value){
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return dateRegex.test(value);
}

// Function to validate generic passport number
function isValidPassport(value){
    const passportRegex = /^(?!0)[a-zA-Z0-9]{6,9}$/;
    return passportRegex.test(value);
}