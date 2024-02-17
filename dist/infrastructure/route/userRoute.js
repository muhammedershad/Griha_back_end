"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const userController_1 = __importDefault(require("../../adapter/userController"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const userUsecase_1 = __importDefault(require("../../use_case/userUsecase"));
const otpRepository_1 = __importDefault(require("../repository/otpRepository"));
const otpUsecase_1 = __importDefault(require("../../use_case/otpUsecase"));
const express_1 = __importDefault(require("express"));
const userAuthMiddleware_1 = __importDefault(require("../middleware/userAuthMiddleware"));
const adminAuthMiddelware_1 = __importDefault(require("../middleware/adminAuthMiddelware"));
const employeeAuthMiddleware_1 = __importDefault(require("../middleware/employeeAuthMiddleware"));
const otpRepository = new otpRepository_1.default();
const otpUsecase = new otpUsecase_1.default(otpRepository);
const repository = new userRepository_1.default();
const useCase = new userUsecase_1.default(repository);
const controller = new userController_1.default(useCase, otpUsecase);
exports.controller = controller;
const router = express_1.default.Router();
//Test Server
router.post('/signup', (req, res) => controller.signUp(req, res));
router.post('/verify-otp', (req, res) => controller.register(req, res));
router.post('/login', (req, res) => controller.login(req, res));
router.post('/register', (req, res) => controller.register(req, res));
router.post('/email', (req, res) => controller.email(req, res));
router.get('/check-email', (req, res) => controller.checkEmail(req, res));
router.get('/check-username', (req, res) => controller.checkUsername(req, res));
router.post('/resend-otp', (req, res) => controller.resendOTP(req, res));
router.get('/test', userAuthMiddleware_1.default, (req, res) => controller.resendOTP(req, res));
router.get('/users', (req, res) => controller.users(req, res));
router.patch('/block-user', adminAuthMiddelware_1.default, (req, res) => controller.blockUser(req, res));
router.patch('/change-user-role', adminAuthMiddelware_1.default, (req, res) => controller.changeUserRole(req, res));
router.post('/logout', (req, res) => controller.logout(req, res));
router.get('/all-clients', employeeAuthMiddleware_1.default, (req, res) => controller.allClients(req, res));
router.post('/user', userAuthMiddleware_1.default, (req, res) => controller.userDetails(req, res));
router.patch('/update-user-profile-photo', userAuthMiddleware_1.default, (req, res) => controller.userProfilePicUpdate(req, res));
router.get('/:userId', (req, res, next) => controller.user(req, res, next));
exports.default = router;
