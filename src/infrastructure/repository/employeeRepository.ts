import EmployeeModel from "../database/employeeModel";
import { ObjectId, Schema } from "mongoose";
import { ParsedQs } from "qs";
import { Employee } from "../../domain/employee";
import { IEmployees } from "../../domain/employee";
import { ChangePassword } from "../../domain/changePass";

class EmployeeRepository {
    async register(employee: IEmployees) {
        try {
            const newEmployee = new EmployeeModel({
                firstName: employee.firstName,
                email: employee.email,
                jobRole: employee.jobRole,
                password: employee.password,
                department: employee.department,
            });
            const success = await newEmployee.save();
            // console.log(success,'repository');

            return success;
        } catch (error) {
            // return {
            //     status: 500,
            //     success: false,
            //     message: (error as Error).message
            // }
            console.log(error);
        }
    }

    async login(email: string) {
        try {
            const user = await EmployeeModel.findOne({ email: email });
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async allEmployees() {
        try {
            const employees = await EmployeeModel.find();
            return employees;
        } catch (error) {
            console.log(error);
        }
    }

    async changeIsBlock(
        userId:
            | string
            | Schema.Types.ObjectId
            | string[]
            | ParsedQs
            | ParsedQs[]
    ) {
        try {
            const employee = await EmployeeModel.findById(userId);
            if (employee) {
                employee.isBlocked = !employee.isBlocked;
                const success = await employee.save();
                if (success) {
                    return {
                        success: true,
                        message: ` ${
                            employee.isBlocked ? "Unblocked" : "Blocked"
                        } user`,
                        employee: employee,
                    };
                } else {
                    return {
                        success: false,
                        message: `Error in ${
                            employee.isBlocked ? "unblocking" : "blocking"
                        } employee`,
                    };
                }
            } else {
                return {
                    success: false,
                    message: "Employee not found",
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async chageEmployeeRole(
        employeeId:
            | string
            | Schema.Types.ObjectId
            | string[]
            | ParsedQs
            | ParsedQs[]
    ) {
        try {
            const employee = await EmployeeModel.findById(employeeId);
            if (employee) {
                employee.isSenior = !employee.isSenior;
                const success = await employee.save();
                if (success) {
                    return {
                        success: true,
                        message: `Employee role changed`,
                        employee: employee,
                    };
                } else {
                    return {
                        success: false,
                        message: `Error in employee role change`,
                    };
                }
            } else {
                return {
                    success: false,
                    message: "Employee not found",
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async usernameExistsCheck(username: string) {
        try {
            const employee = await EmployeeModel.findOne({
                username: username,
            });
            return employee;
        } catch (error) {
            console.log(error);
        }
    }

    async updateEmployeeInfo(employeeData: Employee) {
        try {
            const employeeUpdate = await EmployeeModel.findOneAndUpdate(
                { _id: employeeData.employeeId },
                {
                    $set: {
                        email: employeeData.email,
                        username: employeeData.username,
                        firstName: employeeData.firstName,
                        lastName: employeeData.lastName,
                        phone: employeeData.phone,
                    },
                },
                {new: true}
            );

            return employeeUpdate;
        } catch (error) {
            console.log(error);
        }
    }

    async saveEmployeePhoto(employeeId: string, imageUrl: string ) {
        try {
            const photoSaved = await EmployeeModel.findOneAndUpdate(
                { _id: employeeId },
                { $set: { image: imageUrl } },
                { new: true }
            );
            // console.log(photoSaved);
            return photoSaved;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async employeeDetails( employeeId: string | ObjectId ) {
        try {
            const employee = await EmployeeModel.findById( employeeId )
            return employee
        } catch (error) {
            console.log(error);
            
        }
    }

    async emailExistsCheck( email: string ) {
        try {
            const employee = await EmployeeModel.findOne({ email: email})
            return employee
        } catch (error) {
            console.log(error);  
        }
    }

    async changePasssword( data: ChangePassword ) {
        try {
            const passChanged = await EmployeeModel.findByIdAndUpdate(data.id, {$set:{password: data.confirmPassword}})
            return passChanged
        } catch (error) {
            console.log(error); 
        }
    }
    
}
export default EmployeeRepository;
