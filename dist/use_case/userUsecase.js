"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { verifyOTP } from "../infrastructure/repository/otpRepository";
// import { verifyEmail } from "./interface/emailService";
// import BcryptPasswordHashingService from './interface/encryptService';
// import JWTService from "./interface/jwtService";
// import Otp from "../domain/otp";
// import adminRepository from "../infrastructure/repository/adminRepository";
// const encryptService = new BcryptPasswordHashingService();
// const tokenService = new JWTService()
// const adminrepository = new adminRepository()
class Userusecase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('inside useCase');
            // const emailFound = await this.userRepository.findByEmail(user.email)
            // const phoneFound = await this.userRepository.findByPhone(user.phone)
            // if (emailFound?.success || phoneFound?.success) {
            //     return {
            //         status: 400,
            //         message: 'User already exists',
            //     }
            // }
            // else {
            //     const newPassword = await encryptService.hashData(user.password) //Hashing password
            //     user.password = newPassword
            //     const registerData = await this.userRepository.save(user)
            //     return {
            //         status: 200,
            //         message: registerData.message,
            //         data: registerData.data,
            //     }
            // }
        });
    }
}
exports.default = Userusecase;
