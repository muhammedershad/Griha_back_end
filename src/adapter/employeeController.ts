import EmployeeUsecase from "../use_case/employeeUsecase";
import { Request, Response } from "express-serve-static-core";
import { isValidEmail, validations } from "../use_case/interface/validations";
import { ObjectId, Schema } from "mongoose";

class EmployeeController {
    private employeeUsecase: EmployeeUsecase
    constructor( employeeUsecase: EmployeeUsecase ) {
        this.employeeUsecase = employeeUsecase
    }

    async register ( req: Request, res: Response ) {
        try {
            let { firstName, email, jobRole, department, password } = req.body;
            if ( !firstName || !email || !jobRole || !department || !password) {
                return res.status(200).json({
                    success: false,
                    message: "Insufficent data"
                })
            }
            const employee = await this.employeeUsecase.register( req.body )
            // console.log(employee);
            
            if ( employee?.success ) {
                res.status(200).json({
                    success: true,
                    message: employee.message
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: employee?.message
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: (error as Error).message  
            })
        }
    }

    async login(req: Request, res: Response) {
        try {
            // console.log(req.body);
            let { email, password } = req.body;

            email = email.trim();
            password = password.trim();

            if (!isValidEmail(email)) {
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid email" });
            }

            if ((password = "")) {
                return res
                    .status(200)
                    .json({ success: false, message: "Invalid password" });
            }

            const login = await this.employeeUsecase.login(
                email,
                req.body.password
            );
            // console.log(login, "login status");
            if (login?.success) {
                res.cookie("token", login?.token || "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    // credentials: "include",
                });
                return res.status(200).json({
                    success: true,
                    message: "login successful",
                    user: login?.user,
                    token: login?.token
                });
            } else {
                return res
                    .status(200)
                    .json({ success: false, message: login?.message });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: (error as Error)?.message,
            })
        }
    }

    async allEmployees ( req: Request, res: Response ) {
        try {
            const allEmployees = await this.employeeUsecase.allEmployees()
            if ( allEmployees.success ) {
                return res.status(200).json({
                    success: true,
                    allEmployees: allEmployees?.allEmployees
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: allEmployees.message
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: (error as Error)?.message,
            })
        }
    }

    async blockEmployee ( req: Request, res: Response ) {
        try {
            const employeeId = req.query.employeeId
            if ( !employeeId ) {
                return res.status(400).json({
                    success: false,
                    message: 'invalid employee id'
                })
            }

            const changeIsBlockStatus = await this.employeeUsecase.changeIsBlockStatus( employeeId )
            if ( changeIsBlockStatus?.success ) {
                res.status(200).json({
                    success: true,
                    user: changeIsBlockStatus.employee,
                    message: changeIsBlockStatus.message
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: changeIsBlockStatus?.message
                })
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: (error as Error)?.message,
            })
        }
    }

    async changeEmployeeRole ( req: Request, res: Response ) {
        try {
            const employeeId = req.query.employeeId
            if ( !employeeId ) {
                return res.status(400).json({
                    success: false,
                    message: 'invalid employee id'
                })
            }
            const changeEmployeeRole = await this.employeeUsecase.chageEmployeeRole( employeeId )
            if ( changeEmployeeRole?.success ) {
                res.status(200).json({
                    success: true,
                    employee: changeEmployeeRole.employee
                })
            } else {
                res.status(200).json({
                    success: false,
                    message: changeEmployeeRole?.message
                })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: (error as Error)?.message,
            })
        }
    }

    async logout ( req: Request, res: Response ) {
        try {
            res.clearCookie('employeeCookie');

            res.status(200).json({
                success: true,
                message: 'Logout successful'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in logout'
            })
        }
    }

    async profileUpdate ( req: Request, res: Response ) {
        try {
            let { firstName, lastName, username, phone, password, email} = req.body

            firstName = firstName.trim()
            lastName = lastName.trim()
            username = username.trim()
            phone = phone.trim()
            password = password.trim()
            email = email.trim()

            if ( !firstName || !validations.isValidFirstName( firstName )) {
                return res.status(200).json({success: false, message: 'Enter a valid first name'})
            }
            if ( !lastName || !validations.isValidLastName( lastName )) {
                return res.status(200).json({success: false, message: 'Enter valid last name'})
            }
            if ( !username || !validations.isValidUsername( username )) {
                return res.status(200).json({success: false, message: 'Enter valid username'})
            } else {
                const usernameExist = await this.employeeUsecase.usernameExistCheck( username )
                if ( usernameExist?.success) {
                    return res.status(200).json({ 
                        success: false,
                        message: usernameExist?.success
                    })
                }
            }
            if(!email || !validations.isValidEmail( email )) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid email'
                })
            }
            if ( !password || !validations.isValidPassword( password )) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid Password'
                })
            }
            if ( !phone || !validations.isValidPhoneNumber( phone )) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid phone number'
                })
            }

            const employeeInfoUpdate = await this.employeeUsecase.updateEmployeeInfo( employee )
        
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in updating in employee info'
            })
        }
    }
}

export default EmployeeController