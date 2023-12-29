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
router.post('/verify-otp', (req, res) => controller.register(req, res))
router.post('/login', (req, res) => controller.login(req, res))
router.post('/register', (req, res) => controller.register(req, res));
router.post('/email', (req, res) => controller.email(req,res))
router.get('/check-email', (req, res) => controller.checkEmail(req, res))
router.get('/check-username', (req, res) => controller.checkUsername(req, res))
router.post('/resend-otp', (req, res) => controller.resendOTP(req, res))



export default router