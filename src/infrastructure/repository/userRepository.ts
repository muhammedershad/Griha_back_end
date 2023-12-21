import User from '../../domain/user'
import UserModel  from '../database/userModel'

class UserRepository {
    async save(user: User) {
        const newUser = new UserModel(user)
        await newUser.save()
        return {
            status: 200,
            success: true,
            data: newUser,
            message: 'User registration successful',
        }
    }

    async findByEmail(email: string) {
        console.log('email exist check')
        const existingUser = await UserModel.findOne({ email })
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

   

}
export default UserRepository