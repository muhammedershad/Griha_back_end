import { Document, Types } from 'mongoose'
import Otp from '../../domain/otp'
import User from '../../domain/user'
import UserModel  from '../database/userModel'

class UserRepository {
    async save(user: User | (Document<unknown, {}, Otp> & Otp & { _id: Types.ObjectId }) | undefined) {
        
        const data = {
            FirstName : user?.firstName,
            LastName : user?.lastName,
            Username : user?.username,
            Password : user?.password,
            Email : user?.email,
            Phone : user?.phone
        }
        const newUser = new UserModel(data)
        await newUser.save()
        return {
            status: 200,
            success: true,
            data: newUser,
            message: 'User registration successful',
        }
    }

    async findByEmail(email: string) {
        console.log('email exist check', email)
        const existingUser = await UserModel.findOne({ Email : email })
        console.log(existingUser,'existinguser')
        if (existingUser) {
            return {
                status: 200,
                success: true,
                data: existingUser,
                message: 'User details found in database'
            }
        }
        else {
            return {
                success : false,

            }
        }
    }

    async findByPhone(phone: string) {
        console.log('phone exist check')
        const existingUser = await UserModel.findOne({ phone })
        if (existingUser) {
            return {
                status: 200,
                success: true,
                data: existingUser,
                message: 'User details found in database'
            }
        }
        else {
            return null
        }
    }

    async login (email: string) {
        try {
            const user = await UserModel.findOne({Email: email});
            return user;
        } catch (error) {
            console.log(error)
        }
    }

   

}
export default UserRepository