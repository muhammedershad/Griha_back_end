import UserController from "../../adapter/userController";
import UserRepository from "../repository/userRepository";
import UserUsecase from "../../use_case/userUsecase";
import OtpRepository from "../repository/otpRepository";
import OtpUsecase from '../../use_case/otpUsecase';
import express from "express";
import authMiddleware from "../middleware/userAuthMiddleware";
import adminAuthMiddleware from "../middleware/adminAuthMiddelware";
import employeeAuthMiddleware from "../middleware/employeeAuthMiddleware";

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
// router.get('/test', authMiddleware, (req, res) => controller.resendOTP(req, res))
router.get('/users', authMiddleware, ( req, res ) => controller.users( req, res ))
router.patch('/block-user', adminAuthMiddleware, ( req, res ) => controller.blockUser( req, res ))
router.patch( '/change-user-role', adminAuthMiddleware, ( req, res ) => controller.changeUserRole( req, res ))
router.post( '/logout', ( req, res ) => controller.logout( req, res ))
router.get('/all-clients', (req, res) => controller.allClients(req, res))
router.post('/user', (req, res) => controller.userDetails(req, res))
router.patch('/update-user-profile-photo', authMiddleware, (req, res) => controller.userProfilePicUpdate(req, res))
router.get('/:userId',authMiddleware, (req, res, next) => controller.user(req, res, next))


export { controller }
export default router