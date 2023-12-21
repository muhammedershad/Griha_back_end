import OtpRipository from '../../src/infrastructure/repository/otpRepository'
import UserRepository from '../infrastructure/repository/userRepository'
import User from '../domain/user'
import otp from '../domain/otp'
import encryptService from './interface/encryptService'
import BcryptPasswordHashingService from './interface/encryptService';
import otpService from './interface/otpService'
import { otpEmail } from './interface/emailService'

const hashService = new BcryptPasswordHashingService()

class OtpUsecases {
    private otpRipository : OtpRipository
    constructor (otpRipository : OtpRipository) {
        this.otpRipository = otpRipository
    }

    // async register(otp: otp) {
    //     console.log('inside useCase')
    //     const emailFound = await this.otpRipository.findByEmail(user.email)
    //     if (emailFound?.success) {
    //         return {
    //             status: 400,
    //             message: 'User already exists',
    //         }
    //     }
    //     else {
    //         const hashedPassword = await encryptService.hashData(user.password) //Hashing password
    //         user.password = hashedPassword
    //         const registerData = await this.userRepository.save(user)
    //         return {
    //             status: 200,
    //             message: registerData.message,
    //             data: registerData.data,
    //         }
    //     }
    // }

    async signUp(user: User) {
        try {
            console.log('inside otp signUp')
        const hashedPassword = await hashService.hashData(user.password) //Hashing password
        user.password = hashedPassword
        const otp = await otpService(4)
        console.log(otp)
        otpEmail(user.email, otp)
        } catch (error) {
            console.log(error);
        }

        
    }
}

export default OtpUsecases