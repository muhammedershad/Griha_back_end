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

const isOtpValid = (otp : string) : boolean => {
    const trimmedOtp = otp.trim()
    const regex = /^\d{4}$/;
    return otp.length !== 4;
}

const isValidFirstName = ( firstName: string ): boolean => {
    return firstName.length > 0
}

const isValidLastName = ( secondName: string ): boolean => {
    return secondName.length > 0
}

const isValidUsername = ( username: string ): boolean => {
    return username.length > 0
} 

export {
    isValidEmail,
    isValidPhoneNumber,
    isValidPassword,
    isValidName,
    isOtpValid
}

export const validations =  {
    isValidEmail,
    isValidPhoneNumber,
    isValidPassword,
    isValidName,
    isOtpValid,
    isValidFirstName,
    isValidLastName,
    isValidUsername
}