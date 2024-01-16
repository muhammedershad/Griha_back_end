import { Request, Response } from "express";
import Userusecase from "../use_case/userUsecase";
import OtpUsecases from "../use_case/otpUsecase";
import {
    isValidEmail,
    isValidName,
    isValidPassword,
    isValidPhoneNumber,
    isOtpValid,
} from "../use_case/interface/validations";
import { sendEmail } from "../use_case/interface/emailService";
import user from "../domain/user";
import { ParsedQs } from "qs";
import { ObjectId } from "mongoose";

class userController {
    private userUsecase: Userusecase;
    private otpusecase: OtpUsecases;
    constructor(usercase: Userusecase, otpusecase: OtpUsecases) {
        this.userUsecase = usercase;
        this.otpusecase = otpusecase;
    }

    async signUp(req: Request, res: Response) {
        try {
            // console.log("userController", req.body); //test

            let { firstName, lastName, email, phone, password, username } =
                req.body;
            firstName = firstName.trim();
            lastName = lastName.trim();
            email = email.trim();
            phone = phone.trim();
            username = username.trim();

            if (!firstName || !email || !password || !phone || !username) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                });
            }

            if (!isValidName(firstName)) {
                // Validate email format
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid Name" });
            }

            if (!isValidEmail(email)) {
                // Validate email format
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid email format" });
            }

            if (!isValidPhoneNumber(phone)) {
                // Validate phone number
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid phone number" });
            }

            if (!isValidPassword(password)) {
                // Validate password
                return res.status(200).json({
                    success: false,
                    message: "Password must be at least 6 characters long",
                });
            }

            const userExists = await this.userUsecase.signup(req.body);
            // console.log(userExists?.userExists, "user exists");
            if (userExists?.userExists) {
                return res.status(200).json({
                    success: false,
                    message: "Email already exists",
                });
            }

            const usernameExists = await this.userUsecase.checkUsername(
                username
            );
            // console.log( usernameExists,'username exists')
            if (!usernameExists?.success) {
                return res.status(200).json({
                    success: false,
                    message: "Username already exists",
                });
            }

            const otpSend = await this.otpusecase.signUp(req.body);

            res.status(200).json({
                success: true,
                message: "OTP sent successfully",
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: (error as Error).message });
        }
    }

    async register(req: Request, res: Response) {
        try {
            console.log('userController',req.body)   //test
            let { otp, email } = req.body;
            email = email.trim();
            otp = otp.trim();

            if (!isValidEmail(email)) {
                // Validate email format
                console.log("There si something wrong with the email")
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid email format" });
            }
            // console.log('hii')

            if (isOtpValid(otp)) {
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid OTP" });
            }

            const user = await this.otpusecase.register(email, otp);
            // console.log(user, "usercotroller");
            if (!user?.success) {
                return res
                    .status(200)
                    .json({ success: false, message: user?.message });
            } else {
                const save = await this.userUsecase.register(user?.user?.user);
            }
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: (error as Error).message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            // console.log(req.body);
            let { email, password } = req.body;

            email = email.trim();
            password = password.trim();

            if (!isValidEmail(email)) {
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid email" });
            }

            if ((password = "")) {
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid password" });
            }

            const login = await this.userUsecase.login(
                email,
                req.body.password
            );
            // console.log(login, "login status");
            if (login?.success) {
                res.cookie("user_token", login?.token || "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    // credentials: "include",
                });
                return res.status(200).json({
                    success: true,
                    message: "login successful",
                    user: login?.user,
                    token: login?.token
                });
            } else {
                return res
                    .status(200)
                    .json({ success: false, message: login?.message });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: (error as Error)?.message,
            })
        }
    }

    async email(req: Request, res: Response) {
        console.log("email controller");
        const email = await sendEmail(
            "muhammedershadP@gmail.com",
            "mail",
            "string"
        );
        return res.json({
            email,
        });
    }

    async checkEmail(req: Request, res: Response) {
        try {
            let email: string | undefined = req.query.email as string;

            email = email.trim();
            if (!isValidEmail(email)) {
                // Validate email format
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid email format" });
            }

            const user = await this.userUsecase.checkEmail(email);

            if ( user?.success ) {
                return res.status(200).json({
                    success: true,
                    message: "User not found",
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: "Email already exists"
                })
            }
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ success: false, message: (error as Error).message });
        }
    }

    checkUsername = async ( req: Request, res: Response ) => {
        try {
            let username: string | undefined = req.query.username as string;

            username = username.trim();
            if (username.length === 0) {
                // Validate username format
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid username" });
            }

            const user = await this.userUsecase.checkUsername(username);

            if (!user?.success) {
                return res.status(200).json({
                    success: false,
                    message: "Username already exists",
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "Username not found",
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: (error as Error)?.message,
            })
        }
    }

    resendOTP = async (req: Request, res: Response ) => {
        try {
            // console.log(req.body )
            let { email } = req.body;

            if (!isValidEmail(email)) {
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid email" });
            } else {
                // console.log('usercontroller resendotp')
                const resendOTP = await this.otpusecase.resendOTP( email )
                // console.log( resendOTP )
                if ( resendOTP?.success ) {
                    res.status(200).json({
                        success: true,
                        message: resendOTP.message
                    })
                } else {
                    res.status(200).json({
                        success: false,
                        message: resendOTP?.message
                    })
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: (error as Error)?.message,
            })
        }
    }

    async blockUser ( req: Request, res: Response ) {
        try {
            const userId = req.query.userId
            if ( !userId ) {
                return res.status(400).json({
                    success: false,
                    message: 'invalid user id'
                })
            }

            const changeIsBlockStatus = await this.userUsecase.changeIsBlockStatus( userId )
            if ( changeIsBlockStatus?.success ) {
                res.status(200).json({
                    success: true,
                    user: changeIsBlockStatus.user,
                    message: changeIsBlockStatus.message
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: changeIsBlockStatus?.message
                })
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: (error as Error)?.message,
            })
        }
    }

    async users ( req: Request, res: Response) {
        try {
            const users = await this.userUsecase.users()
            res.status(200).json({users})
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: (error as Error)?.message,
            })
        }
    }

    async changeUserRole ( req: Request, res: Response ) {
        try {
            const userId = req.query.userId
            if ( !userId ) {
                return res.status(400).json({
                    success: false,
                    message: 'invalid user id'
                })
            }
            const changeUserRole = await this.userUsecase.chageUserRole( userId )
            if ( changeUserRole?.success ) {
                res.status(200).json({
                    success: true,
                    user: changeUserRole.user
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: changeUserRole?.message
                })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: (error as Error)?.message,
            })
        }
    }

    async logout ( req: Request, res: Response ) {
        try {
            res.clearCookie('userCookie');

            res.status(200).json({
                success: true,
                message: 'Logout successful'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in logout'
            })
        }
    }

    async allClients (req: Request, res: Response) {
        try {
            const response = await this.userUsecase.allClients()
            return res.status(200).json(response)
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in logout'
            })
        }
    }

    async userDetails (req: Request, res: Response) {
        try {
            const { token } = req.body
            if ( !token ) {
                return res.status(400).json({success: false, message: 'Invalid token'})
            }
            const response = await this.userUsecase.employeeDetails( token )
            if ( response?.success ) {
                return res.status(200).json(response)
            } else {
                return res.status(400).json(response)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in logout'
            })
        }
    }

    async userProfilePicUpdate(req: Request, res: Response) {
        try {
            let {imageUrl, userId} = req.body

            imageUrl = imageUrl.trim()
            userId = userId.trim()

            if ( !imageUrl || !userId ) {
                return res.status(400).json({success: false, message: "Invalid imageUrl or userId"})
            }

            const saveUserPhoto = await this.userUsecase.saveUserPhoto(userId, imageUrl )
            if ( saveUserPhoto?.success ) {
                return res.status(200).json(saveUserPhoto)
            } else {
                return res.status(400).json(saveUserPhoto)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in logout'
            })
        }
    }
}

export default userController;
