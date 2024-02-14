import { Document, ObjectId, Schema, Types } from "mongoose";
import Otp from "../../domain/otp";
import User from "../../domain/user";
import UserModel from "../database/userModel";
import { ParsedQs } from "qs";

class UserRepository {
    //save data to database
    async save(
        user:
            | User
            | (Document<unknown, {}, Otp> & Otp & { _id: Types.ObjectId })
            | undefined
    ) {
        const data = {
            firstName: user?.firstName,
            lastName: user?.lastName,
            username: user?.username,
            password: user?.password,
            email: user?.email,
            phone: user?.phone,
        };
        const newUser = new UserModel(data);
        await newUser.save();
        return {
            status: 200,
            success: true,
            data: newUser,
            message: "User registration successful",
        };
    }

    async findByEmail(email: string) {
        try {
            // console.log('email exist check', email)
            const existingUser = await UserModel.findOne({ email });
            // console.log(existingUser,'existinguser')
            if (existingUser) {
                return {
                    status: 200,
                    success: false,
                    data: existingUser,
                    message: "User details found in database",
                };
            } else {
                return {
                    success: true,
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async findByUsername(username: string) {
        try {
            // console.log(username, "checking username");
            const user = await UserModel.findOne({ username: username });
            // console.log(user, "user");
            if (user) {
                return {
                    success: false,
                    message: "Username alredy exists",
                };
            } else {
                return {
                    success: true,
                    message: "Username not found in database",
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async findByPhone(phone: string) {
        // console.log("phone exist check");
        const existingUser = await UserModel.findOne({ phone });
        if (existingUser) {
            return {
                status: 200,
                success: true,
                data: existingUser,
                message: "User details found in database",
            };
        } else {
            return null;
        }
    }

    async login(email: string) {
        try {
            const user = await UserModel.findOne({ email });
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async changeIsBlock ( userId: string | Schema.Types.ObjectId | string[] | ParsedQs | ParsedQs[] ) {
        try {
            const user = await UserModel.findById( userId )
            if ( user ) {
                user.isBlocked = !user.isBlocked;
                const success = await user.save()
                if ( success ) {
                    return {
                        success: true,
                        message: ` ${user.isBlocked ? 'Unblocked' : 'Blocked'} user`,
                        user: user
                    }
                } else {
                    return {
                        success: false,
                        message: `Error in ${user.isBlocked ? 'unblocking' : 'blocking'} user`
                    }
                }
            } else {
                return {
                    success: false,
                    message: 'User not found'
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async users () {
        try {
            const users = await UserModel.find()
            // console.log(users)
            return users
        } catch (error) {
            console.log(error);
        }
    }

    async chageUserRole ( userId: string | Schema.Types.ObjectId | string[] | ParsedQs | ParsedQs[] ) {
        try {
            const user = await UserModel.findById( userId )
            if ( user ) {
                user.client = !user.client;
                const success = await user.save()
                if ( success ) {
                    return {
                        success: true,
                        message: `User role changed`,
                        user: user
                    }
                } else {
                    return {
                        success: false,
                        message: `Error in user role change`
                    }
                }
            } else {
                return {
                    success: false,
                    message: 'User not found'
                }
            }
        } catch (error) {
            console.log(error); 
        }
    }

    async allClients() {
        try {
            const response = await UserModel.find({client: true})
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async userDetails( userId: string) {
        try {
            const user = await UserModel.findById( userId )
            return user
        } catch (error) {
            console.log(error);
            
        }
    }

    async saveUserPhoto( userId: string, imageUrl: string ) {
        try {
            const photoSaved = await UserModel.findOneAndUpdate(
                { _id: userId },
                { $set: { image: imageUrl } },
                { new: true }
            );
            // console.log(photoSaved);
            return photoSaved;
        } catch (error) {
            console.log(error);
            
        }
    }

    async user(data: string) {
        try {
            const response = await UserModel.findById(data)
            return response
        } catch (error) {
            throw error
        }
    }
}
export default UserRepository;
