import EmployeeUsecase from "../use_case/employeeUsecase";
import { Request, Response } from "express-serve-static-core";

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
            const employee = this.employeeUsecase.register( req.body )
            console.log(employee);
            
            if ( employee.success ) {
                res.status(200).json({
                    success: true,
                    message: employee.message
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
}

export default EmployeeController