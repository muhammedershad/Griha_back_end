import { Document, ObjectId, Schema, Types } from "mongoose";
import Otp from "../../domain/otp";
import User from "../../domain/user";
import UserModel from "../database/userModel";
import { ParsedQs } from "qs";

class UserRepository {
    async save(
        user:
            | User
            | (Document<unknown, {}, Otp> & Otp & { _id: Types.ObjectId })
            | undefined
    ) {
        const data = {
            FirstName: user?.firstName,
            LastName: user?.lastName,
            Username: user?.username,
            Password: user?.password,
            Email: user?.email,
            Phone: user?.phone,
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
            const existingUser = await UserModel.findOne({ Email: email });
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
            const user = await UserModel.findOne({ Username: username });
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
            const user = await UserModel.findOne({ Email: email });
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async changeIsBlock ( userId: string | Schema.Types.ObjectId | string[] | ParsedQs | ParsedQs[] ) {
        try {
            const user = await UserModel.findById( userId )
            if ( user ) {
                user.IsBlocked = !user.IsBlocked;
                const success = await user.save()
                if ( success ) {
                    return {
                        success: true,
                        message: ` ${user.IsBlocked ? 'Unblocked' : 'Blocked'} user`,
                        user: user
                    }
                } else {
                    return {
                        success: false,
                        message: `Error in ${user.IsBlocked ? 'unblocking' : 'blocking'} user`
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
                user.Client = !user.Client;
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
}
export default UserRepository;
