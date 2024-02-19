import { Request, Response } from "express";
import AdminAuthUsecase from "../use_case/adminAuthUsecase";
import { links } from "../infrastructure/config/links";

class AdminController {
    private adminAuthUsecase: AdminAuthUsecase;
    constructor(adminAuthUsecase: AdminAuthUsecase) {
        this.adminAuthUsecase = adminAuthUsecase;
    }

    async login(req: Request, res: Response) {
        try {
            let { email, password } = req.body;
            const username = email;
            // console.log( req.body )

            if (!username || !password) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid username or password",
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
                    message: "Enter a valid password",
                });
            }

            const loginResult: any = await this.adminAuthUsecase.login(
                username,
                password
            );
            // console.log(loginResult.token)
            const expirationDate = new Date(); // Create a new Date object
            expirationDate.setHours(expirationDate.getHours() + 1);

            if (loginResult.success) {
                res.cookie("admin_token", loginResult?.token || "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    expires: expirationDate,
                });
                return res.status(200).json({
                    success: true,
                    token: loginResult?.token,
                    user: loginResult.admin,
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: loginResult?.message,
                });
            }
        } catch (error) {
            console.log(error);
            // Handle the error and send an appropriate response
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie("admin_token");

            res.status(200).json({
                success: true,
                message: "Logout successful",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Error in logout",
            });
        }
    }
}

export default AdminController;
