// Validation function for email using regex
function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validation function for phone number using regex and minimum length
function isValidPhoneNumber(phone: string) {
    const phoneRegex = /^\d{10,13}$/; // minimum 10 digits
    return phoneRegex.test(phone);
}

// Validation function for password minimum length
function isValidPassword(password: string) {
    return password.length >= 6; // minimum length of password
}

function isValidName(name: string){
    const nameRegex =  /^[a-zA-Z]{3,}$/;
    return nameRegex.test(name);
}

export {
    isValidEmail,
    isValidPhoneNumber,
    isValidPassword,
    isValidName,
}