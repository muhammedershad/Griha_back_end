import nodemailer from 'nodemailer'
import otpService from './otpService'
require('dotenv').config()
// import { saveOtp } from '../../infrastructure/repository/otpRepository'

const auth_email = process.env.AUTH_EMAIL
const auth_password = process.env.AUTH_PASS

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: auth_email,
        pass: auth_password,
    },
})

//test transporter
transporter.verify((error: any, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Mail Server Initialized : " + success)
    }
});

//=======send email============
export const sendEmail = async (email: string, mailSubject: string, message: string) => {
    console.log('mail sending')
    const mailOptions = {
        from: auth_email,
        to: email,
        subject: mailSubject,
        html: message,
    }
    const sendEmail = await transporter.sendMail(mailOptions);
    if (sendEmail) {
        return {
            status: 200,
            success: true,
            message: "Email sent successfully"
        }
    } else {
        return {
            status: 400,
            success: false,
            message: "Failed to send email"
        }
    }
}

// -------------------------------
// Email Verification OTP 

export const otpEmail = async (email: string, otp: string) => {
    try {
        console.log(
            'otp email ', email, otp
        );
        
        let mailSubject = 'Email Verification'
        let message = `<p>Your Email ID : ${email}</p> <p style ="color:tomato; font-size:25px; letter-spacing:2px;"><b> ${otp}</b></p> 
        <p>This code can be used to verify your email in Griha.
         The code expire in 5 minutes`

        //send OTP as Email
        const sendOtp = await sendEmail(email, mailSubject, message)
        console.log('emailService', sendOtp)
        return {
            success: true,
            status: sendOtp.status,
            message: sendOtp.message
        }
    } catch (error) {
        return {
            success: false,
            status: 400,
            message: (error as Error).message
        }
    }
}

export const verifyEmail = async (email: string) => {
    try {
        // const Otp = await otpService(5); //OTP digits given as parameter
        // const savedOtp = await saveOtp(email, Otp)

        let mailSubject = 'Email Verification'
        let message = `<p>Your Email ID : ${email}</p> <p style ="color:tomato; font-size:25px; letter-spacing:2px;"><b> </b></p> 
        <p>This code can be used to verify your email in Learner's Lounge.
         The code expire in 15 minutes`

        //send OTP as Email
        const sendOtp = await sendEmail(email, mailSubject, message)
        // console.log('emailService', sendOtp)
        return {
            status: sendOtp.status,
            message: sendOtp.message
        }
    } catch (error) {
        return {
            status: 400,
            message: (error as Error).message
        }
    }

}