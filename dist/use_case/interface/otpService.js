"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateOTP = async (digits) => {
    return `${Math.floor(Math.pow(10, digits - 1) + Math.random() * 9 * Math.pow(10, digits - 1))}`;
};
exports.default = generateOTP;
