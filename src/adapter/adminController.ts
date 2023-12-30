import { Request, Response } from "express";
import AdminAuthUsecase from "../use_case/adminAuthUsecase";

class AdminController {
    private adminAuthUsecase: AdminAuthUsecase;
    constructor( adminAuthUsecase: AdminAuthUsecase ) {
        this.adminAuthUsecase = adminAuthUsecase
    }

    async login(req: Request, res: Response) {
        try {
            let { username, password } = req.body;
            console.log( req.body )

            if (!username || !password ) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid username or password"
                })
            }

            if ( username.trim().length === 0 ) {
                return res.status(200).json({
                    success: false,
                    message: "Enter a valid username",
                });
            }

            if ( password.trim().length < 6 ) {
                return res.status(200).json({
                    success: false,
                    message: "Enter a valid password"
                })
            }

            const loginResult: any = await this.adminAuthUsecase.login( username, password );

            if( loginResult.success ) {
                res.cookie("token", loginResult?.token || "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                });
                return res.status(200).json({
                    success: true,
                    token: loginResult?.token,
                    user: loginResult.admin
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: loginResult?.message
                })
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
}

export default AdminController