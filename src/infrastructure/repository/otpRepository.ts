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
        // console.log(email,'userrepository-email')
        const user = await OtpModel.findOne({email : email})
        // console.log(user)
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

    async resendOTP ( email: string, otp: string) {
        try {
            // console.log(email, otp, 'user');
            
            const user = await OtpModel.updateOne({ email: email }, { $set: { otp: otp }},{ upsert: true })
            // console.log(user,'userrepository');

            if( user ) {
                return {
                    success: true,
                    message: 'OTP saved successfully'
                }
            } else {
                return {
                    success: false,
                    message: 'User not found!'
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default OtpRipository