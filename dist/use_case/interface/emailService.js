"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeInvitationMail = exports.verifyEmail = exports.otpEmail = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv').config();
// import { saveOtp } from '../../infrastructure/repository/otpRepository'
const auth_email = process.env.AUTH_EMAIL;
const auth_password = process.env.AUTH_PASS;
let transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: auth_email,
        pass: auth_password,
    },
});
//test transporter
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Mail Server Initialized : " + success);
    }
});
//=======send email============
const sendEmail = async (email, mailSubject, message) => {
    console.log('mail sending');
    const mailOptions = {
        from: auth_email,
        to: email,
        subject: mailSubject,
        html: message,
    };
    const sendEmail = await transporter.sendMail(mailOptions);
    if (sendEmail) {
        return {
            status: 200,
            success: true,
            message: "Email sent successfully"
        };
    }
    else {
        return {
            status: 400,
            success: false,
            message: "Failed to send email"
        };
    }
};
exports.sendEmail = sendEmail;
// -------------------------------
// Email Verification OTP 
const otpEmail = async (email, otp) => {
    try {
        console.log('otp email ', email, otp);
        let mailSubject = 'Email Verification';
        let message = `<p>Your Email ID : ${email}</p> <p style ="color:tomato; font-size:25px; letter-spacing:2px;"><b> ${otp}</b></p> 
        <p>This code can be used to verify your email in Griha.
         The code expire in 5 minutes`;
        //send OTP as Email
        const sendOtp = await (0, exports.sendEmail)(email, mailSubject, message);
        console.log('emailService', sendOtp);
        return {
            success: true,
            status: sendOtp.status,
            message: sendOtp.message
        };
    }
    catch (error) {
        return {
            success: false,
            status: 400,
            message: error.message
        };
    }
};
exports.otpEmail = otpEmail;
const verifyEmail = async (email) => {
    try {
        // const Otp = await otpService(5); //OTP digits given as parameter
        // const savedOtp = await saveOtp(email, Otp)
        let mailSubject = 'Email Verification';
        let message = `<p>Your Email ID : ${email}</p> <p style ="color:tomato; font-size:25px; letter-spacing:2px;"><b> </b></p> 
        <p>This code can be used to verify your email in Learner's Lounge.
         The code expire in 15 minutes`;
        //send OTP as Email
        const sendOtp = await (0, exports.sendEmail)(email, mailSubject, message);
        // console.log('emailService', sendOtp)
        return {
            status: sendOtp.status,
            message: sendOtp.message
        };
    }
    catch (error) {
        return {
            status: 400,
            message: error.message
        };
    }
};
exports.verifyEmail = verifyEmail;
const employeeInvitationMail = async (email) => {
    try {
        let mailSubject = 'Job Letter';
        let message = `
  <div style="font-family: 'Arial', sans-serif; color: #333; max-width: 500px; margin: 0 auto; padding: 20px; background-color: #f8f8f8; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #3498db;">Welcome to Griha Family!</h2>
    <p>Now you can log in to the employee portal of Griha using the following credentials:</p>
    <ul style="list-style-type: none; padding: 0;">
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Password:</strong> Griha@123</li>
    </ul>
    <p>After logging in, please change your password and update your profile for further proceedings.</p>
    <p style="margin-top: 20px; font-size: 14px;">Thank you for joining Griha!</p>
  </div>
`;
        //send OTP as Email
        const jobLetterSend = await (0, exports.sendEmail)(email, mailSubject, message);
        // console.log('emailService', sendOtp)
        return {
            status: jobLetterSend.status,
            message: jobLetterSend.message
        };
    }
    catch (error) {
        console.log(error);
    }
};
exports.employeeInvitationMail = employeeInvitationMail;
