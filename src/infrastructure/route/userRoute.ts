import UserController from "../../adapter/userController";
import UserRepository from "../repository/userRepository";
import UserUsecase from "../../use_case/userUsecase";
import OtpRepository from "../repository/otpRepository";
import OtpUsecase from '../../use_case/otpUsecase';
import express from "express";

const otpRepository = new OtpRepository()
const otpUsecase = new OtpUsecase(otpRepository)

const repository = new UserRepository()
const useCase = new UserUsecase(repository)
const controller = new UserController(useCase, otpUsecase)

const router = express.Router()
//Test Server

router.post('/signup', (req, res) => controller.signUp(req, res))
router.post('/register', (req, res) => controller.register(req, res));
router.post('/email', (req, res) => controller.email(req,res))
router.get('/check-user-email', (req, res) => controller.checkEmail(req, res))

export default router