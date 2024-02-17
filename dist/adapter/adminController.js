"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminController {
    constructor(adminAuthUsecase) {
        this.adminAuthUsecase = adminAuthUsecase;
    }
    async login(req, res) {
        try {
            let { email, password } = req.body;
            const username = email;
            // console.log( req.body )
            if (!username || !password) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid username or password"
                });
            }
            if (username.trim().length === 0) {
                return res.status(200).json({
                    success: false,
                    message: "Enter a valid username",
                });
            }
            if (password.trim().length < 6) {
                return res.status(200).json({
                    success: false,
                    message: "Enter a valid password"
                });
            }
            const loginResult = await this.adminAuthUsecase.login(username, password);
            console.log(loginResult.token);
            if (loginResult.success) {
                res.cookie("admin_token", (loginResult === null || loginResult === void 0 ? void 0 : loginResult.token) || "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                });
                return res.status(200).json({
                    success: true,
                    token: loginResult === null || loginResult === void 0 ? void 0 : loginResult.token,
                    user: loginResult.admin
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: loginResult === null || loginResult === void 0 ? void 0 : loginResult.message
                });
            }
        }
        catch (error) {
            console.log(error);
            // Handle the error and send an appropriate response
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
    async logout(req, res) {
        try {
            res.clearCookie('admin_token');
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
}
exports.default = AdminController;
