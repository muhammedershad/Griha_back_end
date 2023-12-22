import { OtpModel } from '../database/otpModel'
import otp from '../../domain/otp'
import UserModel  from '../database/userModel';
import JWTService from '../../use_case/interface/JWTService';
const tokenService = new JWTService()

class OtpRipository {
    save = async (user : otp) => {
        try {
            await OtpModel.findOneAndDelete({ email: user.email });
            const newUser = new OtpModel(user)
            const data = await newUser.save()
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    verifyOTP = async (email: string) => {
        console.log(email,'userrepository-email')
        const user = await OtpModel.findOne({email : email})
        console.log(user)
        if(user) {
            return {
                success : true,
                user
            }
        } else {
            return {
                success: false,
                message: 'User not found!'
            }
        }
    }
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