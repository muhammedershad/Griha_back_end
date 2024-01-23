import { Document, ObjectId, Schema, Types } from "mongoose";
import Otp from "../domain/otp";
import User from "../domain/user";
import userRepository from "../infrastructure/repository/userRepository";
// import { verifyOTP } from "../infrastructure/repository/otpRepository";
// import { verifyEmail } from "./interface/emailService";
import BcryptPasswordHashingService from "./interface/encryptService";
import UserRepository from "../infrastructure/repository/userRepository";
import JWTService from "./interface/JWTService";
import { ParsedQs } from "qs";
// import Otp from "../domain/otp";
// import adminRepository from "../infrastructure/repository/adminRepository";

const encryptService = new BcryptPasswordHashingService();
const JWT = new JWTService();
// const tokenService = new JWTService()
// const adminrepository = new adminRepository()

class Userusecase {
    private userRepository: userRepository;
    constructor(userRepository: userRepository) {
        this.userRepository = userRepository;
    }

    async signup(user: User) {
        try {
            // console.log("singup usecase");
            const emailFound = await this.userRepository.findByEmail(
                user.email
            );
            // console.log(emailFound, "email found");
            if (!emailFound?.success) {
                return {
                    userExists: true,
                    status: 400,
                    message: "Email already exists",
                };
            } else {
                return {
                    userExists: false,
                    status: 200,
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async checkUsername( username: string) {
        try {
            // console.log('checkUsername')
            const usernameFound =  await this.userRepository.findByUsername( username )
            // console.log( usernameFound, 'username found')
            if ( !usernameFound?.success ) {
                return {
                    success: false,
                    message: usernameFound?.message
                }
            } else {
                return {
                    success: true,
                    message: usernameFound?.message
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async register(
        user:
            | User
            | (Document<unknown, {}, Otp> & Otp & { _id: Types.ObjectId })
            | undefined
    ) {
        // console.log("inside useCase");
        const save = await this.userRepository.save(user);
        if (save?.success) {
            return {
                status: 200,
                message: save.message,
            };
        } else {
            return {
                status: 400,
                message: "Error in registration",
            };
        }
    }

    async login(email: string, password: string) {
        try {
            const user = await this.userRepository.login(email);
            if (!user) {
                return {
                    success: false,
                    message: "User not found",
                };
            } else {
                // console.log(password);
                if ( user.IsBlocked ) {
                    return {
                        success: false,
                        message: "User is blocked by admin",
                    };
                }

                const verifyPassword = await encryptService.verifyHashData(
                    password,
                    user?.Password
                );
                
                user.Password = ''

                if ( verifyPassword ) {
                    const token = await JWT.createToken(user._id, "user");
                    
                    if (token) {
                        return {
                            success: true,
                            token,
                            user
                        };
                    } else {
                        return {
                            success: false,
                            message: "Error in token generation",
                        };
                    }
                } else {
                    return {
                        success: false,
                        message: "Incorrect password",
                    };
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async checkEmail(email: string) {
        try {
            // console.log("email check: usecase");
            const user = await this.userRepository.findByEmail( email );
            if (user?.success) {
                return {
                    status: 400,
                    success: true,
                    message: "User already exists",
                };
            } else {
                return {
                    success: false,
                    status: 200,
                    message: "User not found",
                };
            }
        } catch (error) {}
    }

    async changeIsBlockStatus ( userId: string | Schema.Types.ObjectId | string[] | ParsedQs | ParsedQs[] ) {
        try {
            const userBlocking = await this.userRepository.changeIsBlock( userId )
            return userBlocking
        } catch (error) {
            console.log(error);   
        }
    }

    async users () {
        try {
            const users = await this.userRepository.users()
            if ( users ) {
                return {
                    success: true,
                    users: users
                }
            } else {
                return {
                    success: false,
                    message: "User data not found"
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async chageUserRole ( userId: string | Schema.Types.ObjectId | string[] | ParsedQs | ParsedQs[] ) {
        try {
            const response = await this.userRepository.chageUserRole( userId )
            return response
        } catch (error) {
            console.log(error);
            
        }
    }

    async allClients () {
        try {
            const response = await this.userRepository.allClients()
            if (response) return {success: true, message: 'All clients data fetched successfully', allClients:response }
            else return {success: false, message: 'All Clients data fetching failed'}
        } catch (error) {
            console.log(error);
        }
    }

    async employeeDetails (token: string) {
        try {
            const auth = await JWT.verifyToken(token);
            // console.log(auth,'jwt details')
            if (!auth.success || auth.role !== 'user') {
                return {
                    success: false,
                    message: "Unauthorized Request",
                }
            }
            const userId = auth.data.userData
            // console.log(auth.data.userData,'auth.data');
            const user = await this.userRepository.userDetails( userId )
            
            if ( user ) {
                return {
                    success: true,
                    message: 'Found user',
                    user: user
                }
            } else {
                return {
                    success: false,
                    message: 'User not found'
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async saveUserPhoto(userId: string, imageUrl: string) {
        try {
            const photoSaved = await this.userRepository.saveUserPhoto( userId, imageUrl)
            if ( photoSaved ) {
                return {
                    success: true,
                    message: 'Image updated successfully'
                }
            } else {
                return {
                    success: false,
                    message: 'Failure in updating image'
                }
            }
        } catch (error) {
            console.log(error);   
        }
    }

    async user(data: string) {
        try {
            const response = await this.userRepository.user(data)
            if(response) return { success: true, message: 'User data fetched', user: response}
            else throw createError( 500, 'User data not found in data base')
        } catch (error) {
            throw error
        }
    } 
}

export default Userusecase;
function createError(arg0: number, arg1: string) {
    throw new Error("Function not implemented.");
}

