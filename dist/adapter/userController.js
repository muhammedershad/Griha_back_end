"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validations_1 = require("../use_case/interface/validations");
const emailService_1 = require("../use_case/interface/emailService");
class userController {
    constructor(usercase, otpusecase) {
        this.checkUsername = async (req, res) => {
            try {
                let username = req.query.username;
                username = username.trim();
                if (username.length === 0) {
                    // Validate username format
                    return res
                        .status(200)
                        .json({ success: false, message: "Invalid username" });
                }
                const user = await this.userUsecase.checkUsername(username);
                if (!(user === null || user === void 0 ? void 0 : user.success)) {
                    return res.status(200).json({
                        success: false,
                        message: "Username already exists",
                    });
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: "Username not found",
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                });
            }
        };
        this.resendOTP = async (req, res) => {
            try {
                // console.log(req.body )
                let { email } = req.body;
                if (!(0, validations_1.isValidEmail)(email)) {
                    return res
                        .status(200)
                        .json({ success: false, message: "Invalid email" });
                }
                else {
                    // console.log('usercontroller resendotp')
                    const resendOTP = await this.otpusecase.resendOTP(email);
                    // console.log( resendOTP )
                    if (resendOTP === null || resendOTP === void 0 ? void 0 : resendOTP.success) {
                        res.status(200).json({
                            success: true,
                            message: resendOTP.message
                        });
                    }
                    else {
                        res.status(200).json({
                            success: false,
                            message: resendOTP === null || resendOTP === void 0 ? void 0 : resendOTP.message
                        });
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                });
            }
        };
        this.userUsecase = usercase;
        this.otpusecase = otpusecase;
    }
    async signUp(req, res) {
        try {
            // console.log("userController", req.body); //test
            let { firstName, lastName, email, phone, password, username } = req.body;
            firstName = firstName.trim();
            lastName = lastName.trim();
            email = email.trim();
            phone = phone.trim();
            username = username.trim();
            if (!firstName || !email || !password || !phone || !username) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                });
            }
            if (!(0, validations_1.isValidName)(firstName)) {
                // Validate email format
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid Name" });
            }
            if (!(0, validations_1.isValidEmail)(email)) {
                // Validate email format
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid email format" });
            }
            if (!(0, validations_1.isValidPhoneNumber)(phone)) {
                // Validate phone number
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid phone number" });
            }
            if (!(0, validations_1.isValidPassword)(password)) {
                // Validate password
                return res.status(200).json({
                    success: false,
                    message: "Password must be at least 6 characters long",
                });
            }
            const userExists = await this.userUsecase.signup(req.body);
            // console.log(userExists?.userExists, "user exists");
            if (userExists === null || userExists === void 0 ? void 0 : userExists.userExists) {
                return res.status(200).json({
                    success: false,
                    message: "Email already exists",
                });
            }
            const usernameExists = await this.userUsecase.checkUsername(username);
            // console.log( usernameExists,'username exists')
            if (!(usernameExists === null || usernameExists === void 0 ? void 0 : usernameExists.success)) {
                return res.status(200).json({
                    success: false,
                    message: "Username already exists",
                });
            }
            const otpSend = await this.otpusecase.signUp(req.body);
            res.status(200).json({
                success: true,
                message: "OTP sent successfully",
            });
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }
    }
    async register(req, res) {
        var _a;
        try {
            console.log('userController', req.body); //test
            let { otp, email } = req.body;
            email = email.trim();
            otp = otp.trim();
            if (!(0, validations_1.isValidEmail)(email)) {
                // Validate email format
                console.log("There is something wrong with the email");
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid email format" });
            }
            // console.log('hii')
            if ((0, validations_1.isOtpValid)(otp)) {
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid OTP" });
            }
            const user = await this.otpusecase.register(email, otp);
            // console.log(user, "usercotroller");
            if (!(user === null || user === void 0 ? void 0 : user.success)) {
                return res
                    .status(200)
                    .json({ success: false, message: user === null || user === void 0 ? void 0 : user.message });
            }
            else {
                const save = await this.userUsecase.register((_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.user);
            }
            res.status(200).json(user);
        }
        catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }
    }
    async login(req, res) {
        try {
            // console.log(req.body);
            let { email, password } = req.body;
            email = email.trim();
            password = password.trim();
            if (!(0, validations_1.isValidEmail)(email)) {
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid email" });
            }
            if ((password = "")) {
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid password" });
            }
            const login = await this.userUsecase.login(email, req.body.password);
            // console.log(login, "login status");
            if (login === null || login === void 0 ? void 0 : login.success) {
                res.cookie("user_token", (login === null || login === void 0 ? void 0 : login.token) || "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    // credentials: "include",
                });
                return res.status(200).json({
                    success: true,
                    message: "login successful",
                    user: login === null || login === void 0 ? void 0 : login.user,
                    token: login === null || login === void 0 ? void 0 : login.token
                });
            }
            else {
                return res
                    .status(200)
                    .json({ success: false, message: login === null || login === void 0 ? void 0 : login.message });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error === null || error === void 0 ? void 0 : error.message,
            });
        }
    }
    async email(req, res) {
        console.log("email controller");
        const email = await (0, emailService_1.sendEmail)("muhammedershadP@gmail.com", "mail", "string");
        return res.json({
            email,
        });
    }
    async checkEmail(req, res) {
        try {
            let email = req.query.email;
            email = email.trim();
            if (!(0, validations_1.isValidEmail)(email)) {
                // Validate email format
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid email format" });
            }
            const user = await this.userUsecase.checkEmail(email);
            if (user === null || user === void 0 ? void 0 : user.success) {
                return res.status(200).json({
                    success: true,
                    message: "User not found",
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: "Email already exists"
                });
            }
        }
        catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }
    }
    async blockUser(req, res) {
        try {
            const userId = req.query.userId;
            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: 'invalid user id'
                });
            }
            const changeIsBlockStatus = await this.userUsecase.changeIsBlockStatus(userId);
            if (changeIsBlockStatus === null || changeIsBlockStatus === void 0 ? void 0 : changeIsBlockStatus.success) {
                res.status(200).json({
                    success: true,
                    user: changeIsBlockStatus.user,
                    message: changeIsBlockStatus.message
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: changeIsBlockStatus === null || changeIsBlockStatus === void 0 ? void 0 : changeIsBlockStatus.message
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error === null || error === void 0 ? void 0 : error.message,
            });
        }
    }
    async users(req, res) {
        try {
            const users = await this.userUsecase.users();
            res.status(200).json({ users });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error === null || error === void 0 ? void 0 : error.message,
            });
        }
    }
    async changeUserRole(req, res) {
        try {
            const userId = req.query.userId;
            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: 'invalid user id'
                });
            }
            const changeUserRole = await this.userUsecase.chageUserRole(userId);
            if (changeUserRole === null || changeUserRole === void 0 ? void 0 : changeUserRole.success) {
                res.status(200).json({
                    success: true,
                    user: changeUserRole.user
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: changeUserRole === null || changeUserRole === void 0 ? void 0 : changeUserRole.message
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error === null || error === void 0 ? void 0 : error.message,
            });
        }
    }
    async logout(req, res) {
        try {
            res.clearCookie('userCookie');
            res.status(200).json({
                success: true,
                message: 'Logout successful'
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in logout'
            });
        }
    }
    async allClients(req, res) {
        try {
            const response = await this.userUsecase.allClients();
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in logout'
            });
        }
    }
    async userDetails(req, res) {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(400).json({ success: false, message: 'Invalid token' });
            }
            const response = await this.userUsecase.employeeDetails(token);
            if (response === null || response === void 0 ? void 0 : response.success) {
                return res.status(200).json(response);
            }
            else {
                return res.status(400).json(response);
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in logout'
            });
        }
    }
    async userProfilePicUpdate(req, res) {
        try {
            let { imageUrl, userId } = req.body;
            imageUrl = imageUrl.trim();
            userId = userId.trim();
            if (!imageUrl || !userId) {
                return res.status(400).json({ success: false, message: "Invalid imageUrl or userId" });
            }
            const saveUserPhoto = await this.userUsecase.saveUserPhoto(userId, imageUrl);
            if (saveUserPhoto === null || saveUserPhoto === void 0 ? void 0 : saveUserPhoto.success) {
                return res.status(200).json(saveUserPhoto);
            }
            else {
                return res.status(400).json(saveUserPhoto);
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in logout'
            });
        }
    }
    async user(req, res, next) {
        try {
            const userId = req.params.userId;
            if (!userId)
                throw createError(400, 'User id is missing');
            const response = await this.userUsecase.user(userId);
            if (response)
                return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = userController;
function createError(arg0, arg1) {
    throw new Error("Function not implemented.");
}
