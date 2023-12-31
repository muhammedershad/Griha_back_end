import EmployeeModel, { IEmployees } from '../database/employeeModel'
import { ObjectId } from 'mongoose'

class EmployeeRepository {

    async register( employee: IEmployees ) {
        try {
            const newEmployee = new EmployeeModel({
                firstName: employee.firstName,
                email: employee.email,
                jobRole: employee.jobRole,
                password: employee.password,
                department: employee.department
            })
            const success = await newEmployee.save()
            return success
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: (error as Error).message
            }
        }
    }

}
export default EmployeeRepository