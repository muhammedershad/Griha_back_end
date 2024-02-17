"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { verifyOTP } from "../infrastructure/repository/otpRepository";
// import { verifyEmail } from "./interface/emailService";
const encryptService_1 = __importDefault(require("./interface/encryptService"));
const JWTService_1 = __importDefault(require("./interface/JWTService"));
// import Otp from "../domain/otp";
// import adminRepository from "../infrastructure/repository/adminRepository";
const encryptService = new encryptService_1.default();
const JWT = new JWTService_1.default();
// const tokenService = new JWTService()
// const adminrepository = new adminRepository()
class Userusecase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async signup(user) {
        try {
            // console.log("singup usecase");
            const emailFound = await this.userRepository.findByEmail(user.email);
            // console.log(emailFound, "email found");
            if (!(emailFound === null || emailFound === void 0 ? void 0 : emailFound.success)) {
                return {
                    userExists: true,
                    status: 400,
                    message: "Email already exists",
                };
            }
            else {
                return {
                    userExists: false,
                    status: 200,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async checkUsername(username) {
        try {
            // console.log('checkUsername')
            const usernameFound = await this.userRepository.findByUsername(username);
            // console.log( usernameFound, 'username found')
            if (!(usernameFound === null || usernameFound === void 0 ? void 0 : usernameFound.success)) {
                return {
                    success: false,
                    message: usernameFound === null || usernameFound === void 0 ? void 0 : usernameFound.message
                };
            }
            else {
                return {
                    success: true,
                    message: usernameFound === null || usernameFound === void 0 ? void 0 : usernameFound.message
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async register(user) {
        // console.log("inside useCase");
        const save = await this.userRepository.save(user);
        if (save === null || save === void 0 ? void 0 : save.success) {
            return {
                status: 200,
                message: save.message,
            };
        }
        else {
            return {
                status: 400,
                message: "Error in registration",
            };
        }
    }
    async login(email, password) {
        try {
            const user = await this.userRepository.login(email);
            if (!user) {
                return {
                    success: false,
                    message: "User not found",
                };
            }
            else {
                // console.log(password);
                if (user.isBlocked) {
                    return {
                        success: false,
                        message: "User is blocked by admin",
                    };
                }
                const verifyPassword = await encryptService.verifyHashData(password, user === null || user === void 0 ? void 0 : user.password);
                user.password = '';
                if (verifyPassword) {
                    const token = await JWT.createToken(user._id, "user");
                    if (token) {
                        return {
                            success: true,
                            token,
                            user
                        };
                    }
                    else {
                        return {
                            success: false,
                            message: "Error in token generation",
                        };
                    }
                }
                else {
                    return {
                        success: false,
                        message: "Incorrect password",
                    };
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async checkEmail(email) {
        try {
            // console.log("email check: usecase");
            const user = await this.userRepository.findByEmail(email);
            if (user === null || user === void 0 ? void 0 : user.success) {
                return {
                    status: 400,
                    success: true,
                    message: "User already exists",
                };
            }
            else {
                return {
                    success: false,
                    status: 200,
                    message: "User not found",
                };
            }
        }
        catch (error) { }
    }
    async changeIsBlockStatus(userId) {
        try {
            const userBlocking = await this.userRepository.changeIsBlock(userId);
            return userBlocking;
        }
        catch (error) {
            console.log(error);
        }
    }
    async users() {
        try {
            const users = await this.userRepository.users();
            if (users) {
                return {
                    success: true,
                    users: users
                };
            }
            else {
                return {
                    success: false,
                    message: "User data not found"
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async chageUserRole(userId) {
        try {
            const response = await this.userRepository.chageUserRole(userId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
    async allClients() {
        try {
            const response = await this.userRepository.allClients();
            if (response)
                return { success: true, message: 'All clients data fetched successfully', allClients: response };
            else
                return { success: false, message: 'All Clients data fetching failed' };
        }
        catch (error) {
            console.log(error);
        }
    }
    async employeeDetails(token) {
        try {
            const auth = await JWT.verifyToken(token);
            // console.log(auth,'jwt details')
            if (!auth.success || auth.role !== 'user') {
                return {
                    success: false,
                    message: "Unauthorized Request",
                };
            }
            const userId = auth.data.userData;
            // console.log(auth.data.userData,'auth.data');
            const user = await this.userRepository.userDetails(userId);
            if (user) {
                return {
                    success: true,
                    message: 'Found user',
                    user: user
                };
            }
            else {
                return {
                    success: false,
                    message: 'User not found'
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async saveUserPhoto(userId, imageUrl) {
        try {
            const photoSaved = await this.userRepository.saveUserPhoto(userId, imageUrl);
            if (photoSaved) {
                return {
                    success: true,
                    message: 'Image updated successfully'
                };
            }
            else {
                return {
                    success: false,
                    message: 'Failure in updating image'
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async user(data) {
        try {
            const response = await this.userRepository.user(data);
            if (response)
                return { success: true, message: 'User data fetched', user: response };
            else
                throw createError(500, 'User data not found in data base');
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = Userusecase;
function createError(arg0, arg1) {
    throw new Error("Function not implemented.");
}
