"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employeeModel_1 = __importDefault(require("../database/employeeModel"));
class EmployeeRepository {
    async register(employee) {
        try {
            const newEmployee = new employeeModel_1.default({
                firstName: employee.firstName,
                email: employee.email,
                jobRole: employee.jobRole,
                password: employee.password,
                department: employee.department,
            });
            const success = await newEmployee.save();
            // console.log(success,'repository');
            return success;
        }
        catch (error) {
            // return {
            //     status: 500,
            //     success: false,
            //     message: (error as Error).message
            // }
            console.log(error);
        }
    }
    async login(email) {
        try {
            const user = await employeeModel_1.default.findOne({ email: email });
            return user;
        }
        catch (error) {
            console.log(error);
        }
    }
    async allEmployees() {
        try {
            const employees = await employeeModel_1.default.find();
            return employees;
        }
        catch (error) {
            console.log(error);
        }
    }
    async changeIsBlock(userId) {
        try {
            const employee = await employeeModel_1.default.findById(userId);
            if (employee) {
                employee.isBlocked = !employee.isBlocked;
                const success = await employee.save();
                if (success) {
                    return {
                        success: true,
                        message: ` ${employee.isBlocked ? "Unblocked" : "Blocked"} user`,
                        employee: employee,
                    };
                }
                else {
                    return {
                        success: false,
                        message: `Error in ${employee.isBlocked ? "unblocking" : "blocking"} employee`,
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: "Employee not found",
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async chageEmployeeRole(employeeId) {
        try {
            const employee = await employeeModel_1.default.findById(employeeId);
            if (employee) {
                employee.isSenior = !employee.isSenior;
                const success = await employee.save();
                if (success) {
                    return {
                        success: true,
                        message: `Employee role changed`,
                        employee: employee,
                    };
                }
                else {
                    return {
                        success: false,
                        message: `Error in employee role change`,
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: "Employee not found",
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async usernameExistsCheck(username) {
        try {
            const employee = await employeeModel_1.default.findOne({
                username: username,
            });
            return employee;
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateEmployeeInfo(employeeData) {
        try {
            const employeeUpdate = await employeeModel_1.default.findOneAndUpdate({ _id: employeeData.employeeId }, {
                $set: {
                    email: employeeData.email,
                    username: employeeData.username,
                    firstName: employeeData.firstName,
                    lastName: employeeData.lastName,
                    phone: employeeData.phone,
                },
            }, { new: true });
            return employeeUpdate;
        }
        catch (error) {
            console.log(error);
        }
    }
    async saveEmployeePhoto(employeeId, imageUrl) {
        try {
            const photoSaved = await employeeModel_1.default.findOneAndUpdate({ _id: employeeId }, { $set: { image: imageUrl } }, { new: true });
            // console.log(photoSaved);
            return photoSaved;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async employeeDetails(employeeId) {
        try {
            const employee = await employeeModel_1.default.findById(employeeId);
            return employee;
        }
        catch (error) {
            console.log(error);
        }
    }
    async emailExistsCheck(email) {
        try {
            const employee = await employeeModel_1.default.findOne({ email: email });
            return employee;
        }
        catch (error) {
            console.log(error);
        }
    }
    async changePasssword(data) {
        try {
            const passChanged = await employeeModel_1.default.findByIdAndUpdate(data.id, { $set: { password: data.confirmPassword } });
            return passChanged;
        }
        catch (error) {
            console.log(error);
        }
    }
    async allSeniorEmployees() {
        try {
            const response = await employeeModel_1.default.find({ isSenior: true });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = EmployeeRepository;
