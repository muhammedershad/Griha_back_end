import EmployeeRepository from "../repository/employeeRepository";
import EmployeeUsecase from "../../use_case/employeeUsecase";
import EmployeeController from "../../adapter/employeeController";
import express from "express";

const repository = new EmployeeRepository()
const useCase = new EmployeeUsecase(repository)
const controller = new EmployeeController(useCase)

const router = express.Router()
//Test Server

router.post('/register', (req, res) => controller.register(req, res));

export default router