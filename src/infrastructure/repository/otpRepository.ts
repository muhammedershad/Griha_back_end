import { OtpModel } from '../database/otpModel'
import otp from '../../domain/otp'
import UserModel  from '../database/userModel';
import JWTService from '../../use_case/interface/JWTService';
const tokenService = new JWTService()

class OtpRipository {
    
}

export const saveOtp = async (email: string, otp: string) => {
    await OtpModel.findOneAndDelete({ email });
    const newUser = new OtpModel({ email, otp })
    const data = await newUser.save()
    return data;
}

// export const verifyOTP = async (email: string, otp: string) => {
//     const savedOtp = await OtpModel.findOne({ email });
//     if (savedOtp?.otp === otp) {
//         const existingUser = await UserModel.findOne({ email })
//         if (!existingUser) {
//             return {
//                 status: 400,
//                 message: 'User not found'
//             }
//         }
//         if (existingUser.IdBlocked) {
//             return {
//                 status: 400,
//                 message: 'User blocked by admin'
//             }
//         }
//         const token = await tokenService.createToken(existingUser._id, existingUser.role)
//         return {
//             status: 200,
//             data: existingUser,
//             token: token,
//             message: 'User details found in database'
//         }
//     } else {
//         return {
//             status: 400,
//             message: 'Incorrect OTP'
//         }
//     }
// }

export default OtpRipository