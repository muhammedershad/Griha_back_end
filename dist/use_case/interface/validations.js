"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidName = exports.isValidPassword = exports.isValidPhoneNumber = exports.isValidEmail = void 0;
// Validation function for email using regex
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
exports.isValidEmail = isValidEmail;
// Validation function for phone number using regex and minimum length
function isValidPhoneNumber(phone) {
    const phoneRegex = /^\d{10,13}$/; // minimum 10 digits
    return phoneRegex.test(phone);
}
exports.isValidPhoneNumber = isValidPhoneNumber;
// Validation function for password minimum length
function isValidPassword(password) {
    return password.length >= 6; // minimum length of password
}
exports.isValidPassword = isValidPassword;
function isValidName(name) {
    const nameRegex = /^[a-zA-Z]{3,}$/;
    return nameRegex.test(name);
}
exports.isValidName = isValidName;
