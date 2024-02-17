"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailService_1 = require("./interface/emailService");
const encryptService_1 = __importDefault(require("./interface/encryptService"));
const JWTService_1 = __importDefault(require("./interface/JWTService"));
const http_errors_1 = __importDefault(require("http-errors"));
const encryptService = new encryptService_1.default();
const JWT = new JWTService_1.default();
class EmployeeUsecase {
    constructor(employeeRepository, bankRepository) {
        this.employeeRepository = employeeRepository;
        this.bankRepository = bankRepository;
    }
    async register(employee) {
        try {
            const hashpass = await encryptService.hashData(employee.password);
            employee.password = hashpass;
            const response = await this.employeeRepository.register(employee);
            // console.log(response);
            if (response) {
                const mailSend = await (0, emailService_1.employeeInvitationMail)(employee.email);
                // console.log(mailSend);
                if (mailSend === null || mailSend === void 0 ? void 0 : mailSend.status) {
                    return {
                        success: true,
                        message: 'Employee added and mail sended'
                    };
                }
                else {
                    return {
                        success: false,
                        message: 'Error in sending mail'
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: 'Error in employee registration'
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async login(email, password) {
        try {
            const user = await this.employeeRepository.login(email);
            if (!user) {
                return {
                    success: false,
                    message: "User not found",
                };
            }
            else {
                // console.log(password);
                if (user === null || user === void 0 ? void 0 : user.isBlocked) {
                    return {
                        success: false,
                        message: "User is blocked by admin",
                    };
                }
                const verifyPassword = await encryptService.verifyHashData(password, user === null || user === void 0 ? void 0 : user.password);
                user.password = '';
                if (verifyPassword) {
                    const token = await JWT.createToken(user === null || user === void 0 ? void 0 : user._id, "employee");
                    if (token) {
                        return {
                            success: true,
                            token,
                            user
                        };
                    }
                    else {
                        return {
                            success: false,
                            message: "Error in token generation",
                        };
                    }
                }
                else {
                    return {
                        success: false,
                        message: "Incorrect password",
                    };
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async allEmployees() {
        try {
            const allEmployees = await this.employeeRepository.allEmployees();
            if (allEmployees) {
                return {
                    success: true,
                    allEmployees: allEmployees
                };
            }
            else {
                return {
                    success: false,
                    message: 'Error in fetching employees data'
                };
            }
        }
        catch (error) {
            console.log(error);
            throw new Error;
        }
    }
    async changeIsBlockStatus(employeeId) {
        try {
            const employeeBlocking = await this.employeeRepository.changeIsBlock(employeeId);
            return employeeBlocking;
        }
        catch (error) {
            console.log(error);
        }
    }
    async chageEmployeeRole(employeeId) {
        try {
            const response = await this.employeeRepository.chageEmployeeRole(employeeId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
    async usernameExistCheck(username) {
        try {
            const usernameExist = await this.employeeRepository.usernameExistsCheck(username);
            if (usernameExist) {
                return {
                    success: false,
                    message: 'Username already exists'
                };
            }
            else {
                return {
                    success: true,
                    message: 'Username not exists'
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateEmployeeInfo(employee) {
        try {
            const employeeDetials = await this.employeeRepository.employeeDetails(employee.employeeId);
            if (!employeeDetials) {
                return {
                    success: false,
                    message: 'Employee not found'
                };
            }
            if (employeeDetials.email !== employee.email) {
                const emailExist = await this.employeeRepository.emailExistsCheck(employee.email);
                if (emailExist)
                    return { success: false, message: 'Email id already exists' };
            }
            if (employee.username !== employeeDetials.username) {
                const usernameExists = await this.employeeRepository.usernameExistsCheck(employee.username);
                if (usernameExists)
                    return { success: false, message: 'Username already exists' };
            }
            const employeeInfoUpdated = await this.employeeRepository.updateEmployeeInfo(employee);
            // console.log(employeeInfoUpdated,'usecase');
            if (employeeInfoUpdated) {
                return {
                    success: true,
                    message: 'Data updated successfully',
                    employeeInfoUpdated
                };
            }
            else {
                return {
                    success: false,
                    message: 'Error in updating Error'
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async saveEmployeePhoto(employeeId, imageUrl) {
        try {
            const photoSaved = await this.employeeRepository.saveEmployeePhoto(employeeId, imageUrl);
            if (photoSaved) {
                return {
                    success: true,
                    message: 'Image updated successfully'
                };
            }
            else {
                return {
                    success: false,
                    message: 'Failure in updating image'
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async employeeDetails(token) {
        try {
            // Verify the token
            const auth = await JWT.verifyToken(token);
            // console.log(auth,'jwt details')
            if (!auth.success || auth.role !== 'employee') {
                return {
                    success: false,
                    message: "Unauthorized Request",
                };
            }
            const employeeId = auth.data.userData;
            // console.log(auth.data.userData,'auth.data');
            const employee = await this.employeeRepository.employeeDetails(employeeId);
            if (employee) {
                return {
                    success: true,
                    message: 'Found employee',
                    employee: employee
                };
            }
            else {
                return {
                    success: false,
                    message: 'Employee not found'
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async changePassword(data) {
        try {
            const employee = await this.employeeRepository.employeeDetails(data.id);
            if (!employee) {
                return { success: false, message: 'Employee not found' };
            }
            const passMatch = await encryptService.verifyHashData(data.currentPassword, employee.password);
            if (!passMatch) {
                return { success: false, message: 'Incorrect current password' };
            }
            const hashedPass = await encryptService.hashData(data.confirmPassword);
            if (hashedPass)
                data.confirmPassword = hashedPass;
            const response = await this.employeeRepository.changePasssword(data);
            console.log(response);
            if (response)
                return { success: true, message: 'Password updated' };
            else
                return { success: false, message: 'Failed in updating password' };
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateBankDetails(data) {
        try {
            const response = await this.bankRepository.updateEmployeeBankDetails(data);
            if (response) {
                return { success: true, message: "Bank details updated successfully", bankDetails: response };
            }
            else {
                return { success: false, message: 'Bank details updating failed' };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async employeeBankDetails(userId) {
        try {
            const response = await this.bankRepository.getUserBankDetails(userId);
            if (response)
                return { success: true, message: 'Employee Bank details fetching success', bankDetails: response };
            else
                return { success: false, message: 'Employee bank details fetching failed' };
        }
        catch (error) {
            console.log(error);
        }
    }
    async allSeniorEmployees() {
        try {
            const response = await this.employeeRepository.allSeniorEmployees();
            if (response)
                return { success: true, message: 'All seniors data fetched successfully', allSeniors: response };
            else
                throw (0, http_errors_1.default)(500, 'Senior employees data fetching failed');
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = EmployeeUsecase;
