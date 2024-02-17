"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../database/userModel"));
class UserRepository {
    //save data to database
    async save(user) {
        const data = {
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
            username: user === null || user === void 0 ? void 0 : user.username,
            password: user === null || user === void 0 ? void 0 : user.password,
            email: user === null || user === void 0 ? void 0 : user.email,
            phone: user === null || user === void 0 ? void 0 : user.phone,
        };
        const newUser = new userModel_1.default(data);
        await newUser.save();
        return {
            status: 200,
            success: true,
            data: newUser,
            message: "User registration successful",
        };
    }
    async findByEmail(email) {
        try {
            // console.log('email exist check', email)
            const existingUser = await userModel_1.default.findOne({ email });
            // console.log(existingUser,'existinguser')
            if (existingUser) {
                return {
                    status: 200,
                    success: false,
                    data: existingUser,
                    message: "User details found in database",
                };
            }
            else {
                return {
                    success: true,
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async findByUsername(username) {
        try {
            // console.log(username, "checking username");
            const user = await userModel_1.default.findOne({ username: username });
            // console.log(user, "user");
            if (user) {
                return {
                    success: false,
                    message: "Username alredy exists",
                };
            }
            else {
                return {
                    success: true,
                    message: "Username not found in database",
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async findByPhone(phone) {
        // console.log("phone exist check");
        const existingUser = await userModel_1.default.findOne({ phone });
        if (existingUser) {
            return {
                status: 200,
                success: true,
                data: existingUser,
                message: "User details found in database",
            };
        }
        else {
            return null;
        }
    }
    async login(email) {
        try {
            const user = await userModel_1.default.findOne({ email });
            return user;
        }
        catch (error) {
            console.log(error);
        }
    }
    async changeIsBlock(userId) {
        try {
            const user = await userModel_1.default.findById(userId);
            if (user) {
                user.isBlocked = !user.isBlocked;
                const success = await user.save();
                if (success) {
                    return {
                        success: true,
                        message: ` ${user.isBlocked ? 'Unblocked' : 'Blocked'} user`,
                        user: user
                    };
                }
                else {
                    return {
                        success: false,
                        message: `Error in ${user.isBlocked ? 'unblocking' : 'blocking'} user`
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: 'User not found'
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async users() {
        try {
            const users = await userModel_1.default.find();
            // console.log(users)
            return users;
        }
        catch (error) {
            console.log(error);
        }
    }
    async chageUserRole(userId) {
        try {
            const user = await userModel_1.default.findById(userId);
            if (user) {
                user.client = !user.client;
                const success = await user.save();
                if (success) {
                    return {
                        success: true,
                        message: `User role changed`,
                        user: user
                    };
                }
                else {
                    return {
                        success: false,
                        message: `Error in user role change`
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: 'User not found'
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async allClients() {
        try {
            const response = await userModel_1.default.find({ client: true });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
    async userDetails(userId) {
        try {
            const user = await userModel_1.default.findById(userId);
            return user;
        }
        catch (error) {
            console.log(error);
        }
    }
    async saveUserPhoto(userId, imageUrl) {
        try {
            const photoSaved = await userModel_1.default.findOneAndUpdate({ _id: userId }, { $set: { image: imageUrl } }, { new: true });
            // console.log(photoSaved);
            return photoSaved;
        }
        catch (error) {
            console.log(error);
        }
    }
    async user(data) {
        try {
            const response = await userModel_1.default.findById(data);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = UserRepository;
