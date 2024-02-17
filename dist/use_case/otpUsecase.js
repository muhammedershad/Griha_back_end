"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encryptService_1 = __importDefault(require("./interface/encryptService"));
const otpService_1 = __importDefault(require("./interface/otpService"));
const emailService_1 = require("./interface/emailService");
const hashService = new encryptService_1.default();
class OtpUsecases {
    constructor(otpRipository) {
        this.otpRipository = otpRipository;
    }
    async signUp(user) {
        try {
            // console.log("inside otp signUp");
            const hashedPassword = await hashService.hashData(user.password); //Hashing password
            user.password = hashedPassword;
            const otp = await (0, otpService_1.default)(4);
            console.log(otp);
            const otpSend = await (0, emailService_1.otpEmail)(user.email, otp);
            user.otp = otp;
            if (otpSend.success) {
                const save = await this.otpRipository.save(user);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async register(email, otp) {
        var _a;
        try {
            const user = await this.otpRipository.verifyOTP(email);
            // console.log(user,'otpusecase')
            if (user.success) {
                if (((_a = user.user) === null || _a === void 0 ? void 0 : _a.otp) === otp) {
                    return {
                        success: true,
                        user
                    };
                }
                else {
                    return {
                        success: false,
                        message: 'OTP mismatch'
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: user.message
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async resendOTP(email) {
        try {
            const otp = await (0, otpService_1.default)(4);
            console.log(otp);
            const otpSend = await (0, emailService_1.otpEmail)(email, otp);
            // console.log(otpSend,'sendotp')
            if (otpSend.success) {
                const save = await this.otpRipository.resendOTP(email, otp);
                if (save === null || save === void 0 ? void 0 : save.success) {
                    return {
                        success: true,
                        message: 'OTP sent successfully'
                    };
                }
                else {
                    return {
                        success: false,
                        message: save === null || save === void 0 ? void 0 : save.message
                    };
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = OtpUsecases;
