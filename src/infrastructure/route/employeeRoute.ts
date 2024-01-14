import EmployeeRepository from "../repository/employeeRepository";
import EmployeeUsecase from "../../use_case/employeeUsecase";
import EmployeeController from "../../adapter/employeeController";
import express from "express";
import adminAuthMiddleware from "../middleware/adminAuthMiddelware";
import employeeAuthMiddleware from "../middleware/employeeAuthMiddleware";
import BankRepository from "../repository/bankRepository";

const repository = new EmployeeRepository()
const bankRepository = new BankRepository()
const useCase = new EmployeeUsecase(repository, bankRepository)
const controller = new EmployeeController(useCase)

const router = express.Router()
//Test Server

router.post('/login', (req, res) => controller.login(req, res));
router.post('/register', adminAuthMiddleware, (req, res) => controller.register(req, res));
router.get('/allEmployees', (req, res) => controller.allEmployees(req, res));
router.patch('/block-employee', adminAuthMiddleware, (req, res) => controller.blockEmployee(req, res))
router.patch('/change-employee-role', adminAuthMiddleware, (req, res) => controller.changeEmployeeRole(req, res))
router.post('/logout', ( req, res ) => controller.logout(req, res))
router.patch('/profile', employeeAuthMiddleware, ( req, res ) => controller.profileUpdate(req, res))
router.patch('/update-profile-photo',employeeAuthMiddleware, (req, res) => controller.profilephotoUpdate(req, res))
router.post('/employee', employeeAuthMiddleware, (req, res) => controller.employeeDetails(req, res) )
router.patch('/change-password', employeeAuthMiddleware, (req, res) => controller.changePassword(req, res))
router.post('/update-bank-details', employeeAuthMiddleware, (req, res) => controller.updateBankDetails(req, res))
router.get('/bank-details/:userId', employeeAuthMiddleware, (req, res) => controller.getEmployeeBankDetails(req, res))
router.get('/all-seniors', employeeAuthMiddleware, (req, res, next) => controller.allSeniorEmployees(req, res, next))

export default router