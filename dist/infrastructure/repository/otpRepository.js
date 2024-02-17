"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otpModel_1 = require("../database/otpModel");
const JWTService_1 = __importDefault(require("../../use_case/interface/JWTService"));
const tokenService = new JWTService_1.default();
class OtpRipository {
    constructor() {
        this.save = async (user) => {
            try {
                await otpModel_1.OtpModel.findOneAndDelete({ email: user.email });
                const newUser = new otpModel_1.OtpModel(user);
                const data = await newUser.save();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        };
        this.verifyOTP = async (email) => {
            // console.log(email,'userrepository-email')
            const user = await otpModel_1.OtpModel.findOne({ email: email });
            // console.log(user)
            if (user) {
                return {
                    success: true,
                    user
                };
            }
            else {
                return {
                    success: false,
                    message: 'User not found!'
                };
            }
        };
    }
    async resendOTP(email, otp) {
        try {
            // console.log(email, otp, 'user');
            const user = await otpModel_1.OtpModel.updateOne({ email: email }, { $set: { otp: otp } }, { upsert: true });
            // console.log(user,'userrepository');
            if (user) {
                return {
                    success: true,
                    message: 'OTP saved successfully'
                };
            }
            else {
                return {
                    success: false,
                    message: 'User not found!'
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = OtpRipository;
