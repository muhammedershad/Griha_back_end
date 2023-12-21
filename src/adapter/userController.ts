import { Request, Response } from "express";
import Userusecase from "../use_case/userUsecase";
import OtpUsecases from "../use_case/otpUsecase";
import { isValidEmail, isValidName, isValidPassword, isValidPhoneNumber } from '../use_case/interface/validations'
import { sendEmail } from "../use_case/interface/emailService";

class userController {
    private userUsecase: Userusecase
    private otpusecase: OtpUsecases
    constructor(usercase: Userusecase, otpusecase: OtpUsecases) {
        this.userUsecase = usercase
        this.otpusecase = otpusecase
    }

    async signUp(req: Request, res: Response) {
        try {
            // console.log('userController',req.body)   //test
            let { firstName, lastName, email, phone, password } = req.body
            firstName = firstName.trim();
            lastName = lastName.trim();
            email = email.trim();
            phone = phone.trim();

            if (!firstName || !email || !password || !phone) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            if (!isValidName(firstName)) {             // Validate email format
                return res.status(400).json({ success: false, message: "Invalid Name" });
            }

            if (!isValidEmail(email)) {             // Validate email format
                return res.status(400).json({ success: false, message: "Invalid email format" });
            }

            if (!isValidPhoneNumber(phone)) {        // Validate phone number
                return res.status(400).json({ success: false, message: "Invalid phone number" });
            }

            if (!isValidPassword(password)) {        // Validate password
                return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
            }

            const userExists = await this.userUsecase.signup(req.body)
            console.log(userExists)
            if(userExists?.userExists) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                })
            }

            const otpSend = await this.otpusecase.signUp(req.body)
            
            res.status(200).json()
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async email (req: Request, res: Response) {
        console.log('email controller')
        const email = await sendEmail('muhammedershadP@gmail.com', 'mail', 'string')
        return res.json({
            email
        })
    }

    async checkEmail(req: Request, res: Response) {
        try {
          let email: string | undefined = req.query.email as string;

          email = email.trim();
          if (!isValidEmail(email)) {             // Validate email format
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }
        
        const user = await this.userUsecase.checkEmail(email)

      
          return res.status(200).json({ success: true, message: 'Email successfully processed.' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ success: false, message: (error as Error).message });
        }
      }

    async register(req: Request, res: Response) {
        try {
            // console.log('userController',req.body)   //test
            let { firstName, lastName, email, phone, password } = req.body
            firstName = firstName.trim();
            lastName = lastName.trim();
            email = email.trim();
            phone = phone.trim();

            if (!firstName || !email || !password || !phone) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            if (!isValidName(firstName)) {             // Validate email format
                return res.status(400).json({ success: false, message: "Invalid Name" });
            }

            if (!isValidEmail(email)) {             // Validate email format
                return res.status(400).json({ success: false, message: "Invalid email format" });
            }

            if (!isValidPhoneNumber(phone)) {        // Validate phone number
                return res.status(400).json({ success: false, message: "Invalid phone number" });
            }

            if (!isValidPassword(password)) {        // Validate password
                return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
            }

            const user = await this.userUsecase.register(req.body)
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    // async signIn(req: Request, res: Response) {
    //     try {
    //         console.log('userController')
    //         const user = await this.usercase.signIn(req.body)
    //         res.status(user.status).json(user)
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({ success: false, message: (error as Error).message });
    //     }
    // }

    // async sendOTP(req: Request, res: Response) {
    //     try {
    //         console.log('userController')
    //         const response = await this.usercase.sendOTP(req.body)
    //         res.status(response.status).json(response)
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({ success: false, message: (error as Error).message });
    //     }
    // }

    // async verifyOTP(req: Request, res: Response) {
    //     try {
    //         console.log('userController')
    //         const response = await this.usercase.verifyOTP(req.body)
    //         res.status(response.status).json(response)
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({ success: false, message: (error as Error).message });
    //     }
    // }

    // async tokenDecode(req: Request, res: Response) {
    //     try {
    //         console.log('userController')
    //         const response = await this.usercase.tokenDecode(req.body)
    //         res.status(response.status).json(response)
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({ success: false, message: (error as Error).message });
    //     }
    // }

 
}

export default userController