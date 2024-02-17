"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validations_1 = require("../use_case/interface/validations");
class EmployeeController {
    constructor(employeeUsecase) {
        this.employeeUsecase = employeeUsecase;
    }
    async register(req, res) {
        try {
            let { firstName, email, jobRole, department, password } = req.body;
            if (!firstName || !email || !jobRole || !department || !password) {
                return res.status(200).json({
                    success: false,
                    message: "Insufficent data"
                });
            }
            const employee = await this.employeeUsecase.register(req.body);
            // console.log(employee);
            if (employee === null || employee === void 0 ? void 0 : employee.success) {
                res.status(200).json({
                    success: true,
                    message: employee.message
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: employee === null || employee === void 0 ? void 0 : employee.message
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error.message
            });
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
            const login = await this.employeeUsecase.login(email, req.body.password);
            // console.log(login, "login status");
            if (login === null || login === void 0 ? void 0 : login.success) {
                res.cookie("employee_token", (login === null || login === void 0 ? void 0 : login.token) || "", {
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
    async employeeDetails(req, res) {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(400).json({ success: false, message: 'Invalid token' });
            }
            const response = await this.employeeUsecase.employeeDetails(token);
            if (response === null || response === void 0 ? void 0 : response.success) {
                return res.status(200).json(response);
            }
            else {
                return res.status(400).json(response);
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error === null || error === void 0 ? void 0 : error.message });
        }
    }
    async allEmployees(req, res) {
        try {
            const allEmployees = await this.employeeUsecase.allEmployees();
            if (allEmployees.success) {
                return res.status(200).json({
                    success: true,
                    allEmployees: allEmployees === null || allEmployees === void 0 ? void 0 : allEmployees.allEmployees
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: allEmployees.message
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
    async blockEmployee(req, res) {
        try {
            const employeeId = req.query.employeeId;
            if (!employeeId) {
                return res.status(400).json({
                    success: false,
                    message: 'invalid employee id'
                });
            }
            const changeIsBlockStatus = await this.employeeUsecase.changeIsBlockStatus(employeeId);
            if (changeIsBlockStatus === null || changeIsBlockStatus === void 0 ? void 0 : changeIsBlockStatus.success) {
                res.status(200).json({
                    success: true,
                    user: changeIsBlockStatus.employee,
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
    async changeEmployeeRole(req, res) {
        try {
            const employeeId = req.query.employeeId;
            if (!employeeId) {
                return res.status(400).json({
                    success: false,
                    message: 'invalid employee id'
                });
            }
            const changeEmployeeRole = await this.employeeUsecase.chageEmployeeRole(employeeId);
            if (changeEmployeeRole === null || changeEmployeeRole === void 0 ? void 0 : changeEmployeeRole.success) {
                res.status(200).json({
                    success: true,
                    employee: changeEmployeeRole.employee
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: changeEmployeeRole === null || changeEmployeeRole === void 0 ? void 0 : changeEmployeeRole.message
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
            res.clearCookie('employeeCookie');
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
    async profileUpdate(req, res) {
        try {
            let { firstName, lastName, username, phone, email, _id } = req.body;
            // console.log(req.body)
            firstName = firstName.trim();
            lastName = lastName.trim();
            username = username.trim();
            phone = phone.trim();
            email = email.trim();
            let employeeId = _id.trim();
            if (!firstName || !validations_1.validations.isValidFirstName(firstName)) {
                return res.status(200).json({ success: false, message: 'Enter a valid first name' });
            }
            if (!lastName || !validations_1.validations.isValidLastName(lastName)) {
                return res.status(200).json({ success: false, message: 'Enter valid last name' });
            }
            if (!username || !validations_1.validations.isValidUsername(username)) {
                return res.status(200).json({ success: false, message: 'Enter valid username' });
            }
            else {
                // const usernameExist = await this.employeeUsecase.usernameExistCheck( username )
                // if ( usernameExist?.success) {
                //     return res.status(200).json({ 
                //         success: false,
                //         message: usernameExist?.success
                //     })
                // }
            }
            if (!email || !validations_1.validations.isValidEmail(email)) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid email'
                });
            }
            // if ( !password || !validations.isValidPassword( password )) {
            //     return res.status(200).json({
            //         success: false,
            //         message: 'Invalid Password'
            //     })
            // }
            if (!phone || !validations_1.validations.isValidPhoneNumber(phone)) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid phone number'
                });
            }
            if (!employeeId) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid employee Id'
                });
            }
            const employee = {
                firstName,
                lastName,
                username,
                phone,
                // password,
                email,
                employeeId
            };
            const employeeInfoUpdated = await this.employeeUsecase.updateEmployeeInfo(employee);
            // console.log(employeeInfoUpdated,'respository');
            if (employeeInfoUpdated === null || employeeInfoUpdated === void 0 ? void 0 : employeeInfoUpdated.success) {
                return res.status(200).json(employeeInfoUpdated);
            }
            else {
                return res.status(200).json(employeeInfoUpdated);
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in updating in employee info'
            });
        }
    }
    async profilephotoUpdate(req, res) {
        try {
            let { imageUrl, employeeId } = req.body;
            imageUrl = imageUrl.trim();
            employeeId = employeeId.trim();
            if (!imageUrl || !employeeId) {
                return res.status(400).json({ success: false, message: "Invalid imageUrl or employeeId" });
            }
            const saveEmployeePhoto = await this.employeeUsecase.saveEmployeePhoto(employeeId, imageUrl);
            if (saveEmployeePhoto === null || saveEmployeePhoto === void 0 ? void 0 : saveEmployeePhoto.success) {
                return res.status(200).json(saveEmployeePhoto);
            }
            else {
                return res.status(400).json(saveEmployeePhoto);
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in updating in employee profile photo'
            });
        }
    }
    async changePassword(req, res) {
        try {
            let { currentPassword, newPassword, confirmPassword, id } = req.body;
            if (!currentPassword || currentPassword.length < 6) {
                return res.status(200).json({ success: false, message: 'Invalid current password' });
            }
            if (!newPassword || newPassword.length < 6) {
                return res.status(200).json({ success: false, message: 'Invalid newPassword' });
            }
            if (newPassword !== confirmPassword) {
                return res.status(200).json({ success: false, message: 'Password must watch' });
            }
            if (!id.trim()) {
                return res.status(200).json({ success: false, message: 'Invalid employee id' });
            }
            const response = await this.employeeUsecase.changePassword(req.body);
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in updating in employee profile photo'
            });
        }
    }
    async updateBankDetails(req, res) {
        try {
            let { bankName, accountNumber, IFSCCode, PANNumber, UPIId, userId } = req.body;
            console.log(req.body);
            if (!bankName.trim())
                return res.status(200).json({ success: false, message: 'Invalid account name' });
            if (!accountNumber)
                return res.status(200).json({ success: false, message: 'Invalid accound number' });
            if (!IFSCCode.trim())
                return res.status(200).json({ success: false, message: 'Invalid IFSC code' });
            if (!PANNumber.trim())
                return res.status(200).json({ success: false, message: 'Invalid PAN number' });
            if (!UPIId.trim())
                return res.status(200).json({ success: false, message: 'Invalid UPI id' });
            if (!userId.trim())
                return res.status(200).json({ success: false, message: 'Invalid employee id' });
            const response = await this.employeeUsecase.updateBankDetails(req.body);
            if (response)
                return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in updating in employee profile photo'
            });
        }
    }
    async getEmployeeBankDetails(req, res) {
        try {
            const userId = req.params.userId;
            if (!userId)
                return res.status(400).json({ success: false, message: 'Invalid employeeId' });
            const response = await this.employeeUsecase.employeeBankDetails(userId);
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error in updating in employee profile photo'
            });
        }
    }
    async allSeniorEmployees(req, res, next) {
        try {
            const response = await this.employeeUsecase.allSeniorEmployees();
            if (response)
                return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = EmployeeController;
