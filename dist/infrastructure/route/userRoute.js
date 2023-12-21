"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../../adapter/userController"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const userUsecase_1 = __importDefault(require("../../use_case/userUsecase"));
const express_1 = __importDefault(require("express"));
const repository = new userRepository_1.default();
const useCase = new userUsecase_1.default(repository);
const controller = new userController_1.default(useCase);
const router = express_1.default.Router();
//Test Server
router.post('/register', (req, res) => controller.register(req, res));
exports.default = router;
