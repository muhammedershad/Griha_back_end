import EmployeeRepository from "../repository/employeeRepository";
import EmployeeUsecase from "../../use_case/employeeUsecase";
import EmployeeController from "../../adapter/employeeController";
import express from "express";
import adminAuthMiddleware from "../middleware/adminAuthMiddelware";
import employeeAuthMiddleware from "../middleware/employeeAuthMiddleware";

const repository = new EmployeeRepository()
const useCase = new EmployeeUsecase(repository)
const controller = new EmployeeController(useCase)

const router = express.Router()
//Test Server

router.post('/login', (req, res) => controller.login(req, res));
router.post('/register', adminAuthMiddleware, (req, res) => controller.register(req, res));
router.get('/allEmployees', adminAuthMiddleware, (req, res) => controller.allEmployees(req, res));
router.patch('/block-employee', adminAuthMiddleware, (req, res) => controller.blockEmployee(req, res))
router.patch('/change-employee-role', adminAuthMiddleware, (req, res) => controller.changeEmployeeRole(req, res))
router.post('/logout', ( req, res ) => controller.logout(req, res))
router.patch('/profile', ( req, res ) => controller.profileUpdate(req, res))
router.patch('/update-profile-photo',employeeAuthMiddleware, (req, res) => controller.profilephotoUpdate(req, res))
router.post('/employee', employeeAuthMiddleware, (req, res) => controller.employeeDetails(req, res) )

export default router