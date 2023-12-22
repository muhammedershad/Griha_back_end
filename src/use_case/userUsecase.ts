import { Document, Types } from "mongoose";
import Otp from "../domain/otp";
import User from "../domain/user";
import userRepository from "../infrastructure/repository/userRepository";
// import { verifyOTP } from "../infrastructure/repository/otpRepository";
// import { verifyEmail } from "./interface/emailService";
import BcryptPasswordHashingService from './interface/encryptService';
import UserRepository from "../infrastructure/repository/userRepository";
import JWTService from "./interface/JWTService";
// import Otp from "../domain/otp";
// import adminRepository from "../infrastructure/repository/adminRepository";

const encryptService = new BcryptPasswordHashingService();
const JWT= new JWTService();
// const tokenService = new JWTService()
// const adminrepository = new adminRepository()

class Userusecase {
    private userRepository: userRepository
    constructor(userRepository: userRepository) {
        this.userRepository = userRepository
    }

    async signup(user: User) {
        try {
            console.log('singup usecase')
            const emailFound = await this.userRepository.findByEmail(user.email)
            console.log(emailFound,'email found')
        if (emailFound?.success) {
            return {
                userExitsts: true,
                status: 400,
                message: 'User already exists',
            }
        }
        else {
            return {
                userExists: false,
                status: 200,
                // message: '',
                // data: registerData.data,
            }
        }
        } catch (error) {
            console.log(error)
        }
    }

    async register(user: User | (Document<unknown, {}, Otp> & Otp & { _id: Types.ObjectId; }) | undefined) {
        console.log('inside useCase')
        const save = await this.userRepository.save(user)
        if (save?.success) {
            return {
                status: 200,
                message: save.message,
            }
        }
        else {
            return {
                status: 400,
                message: 'Error in registration',
            }
        }
    }

    async login ( email: string, password: string) {
        try {
            const user = await this.userRepository.login( email)
            if ( !user ) {
                return  {
                    success: false,
                    message: 'User not found'
                } 
            } else {
                console.log(password);
                
                const verifyPassword = await encryptService.verifyHashData(password, user?.Password)
                console.log(verifyPassword,'matches password');
                
                if ( verifyPassword ) {
                    
                    const token = await JWT.createToken( user.Email, 'user')
                    
                    if ( token ) {
                        return {
                            success: true,
                            token
                        }
                    } else {
                        return {
                            success: false,
                            message: 'Error in token generation'
                        }
                    }
                } else {
                    return {
                        success: false,
                        message: 'Incorrect password'
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async checkEmail ( email: string) {
        try {
            console.log('email check: usecase')
        const user = await this.userRepository.findByEmail(email)
        if (user?.success) {
            return {
                status: 400,
                message: 'User already exists',
            }
        } else {
            return {
                status: 200,
                message: 'User not found',
            }
        }
        } catch (error) {
            
        }
    }


    // async signIn(user: User) {
    //     console.log('inside useCase')
    //     const userFound = await this.userRepository.findByEmail(user.email)
    //     if (userFound) {
    //         if (userFound.data.isBlocked) {
    //             return {
    //                 status: 400,
    //                 message: 'User blocked by admin'
    //             }
    //         }
    //         const hashed = userFound.data.password
    //         const isValid = await encryptService.verifyHashData(user.password, hashed)  //not working
    //         console.log(isValid)
    //         if (!isValid) {
    //             return {
    //                 status: 400,
    //                 message: 'Invalid Credentials'
    //             }
    //         }
    //         const token = await tokenService.createToken(userFound.data._id, userFound.data.role)
    //         // console.log(token)
    //         return {
    //             status: 200,
    //             message: 'Valid User',
    //             data: userFound.data,
    //             token: token,
    //         }
    //     } else {
    //         return {
    //             status: 400,
    //             message: 'Invalid Credentials'
    //         }
    //     }
    // }

    // async sendOTP(user: User) {
    //     console.log('inside useCase')
    //     const userFound = await this.userRepository.findByEmail(user.email)
    //     if (!userFound) {         //unregistered user
    //         return {
    //             status: 400,
    //             message: 'Email not registered'
    //         }
    //     }
    //     if (userFound.data.isBlocked) {
    //         return {
    //             status: 400,
    //             message: 'User blocked by admin'
    //         }
    //     }
    //     //send OTP mail   
    //     const sentMail = await verifyEmail(user.email)

    //     return {
    //         status: sentMail.status,
    //         message: sentMail.message,
    //     }
    // }


    // async verifyOTP(user: Otp) {
    //     console.log('inside useCase')
    //     return await verifyOTP(user.email, user.otp)
    // }

    // async tokenDecode(data: { token: string }) {
    //     console.log('inside useCase')
    //     if (!data.token) return {
    //         status: 401,
    //         message: 'Token misssing, Please login again',
    //     }
    //     const response = await tokenService.verifyToken(data.token)
    //     const _id = response?.data?.userData
    //     const User = await adminrepository.findById(_id)
    //     console.log(User)
    //     return {
    //         status: 200,
    //         message: User.message,
    //         data: User.data,
    //     }
    // }

}

export default Userusecase