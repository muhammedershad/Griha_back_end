"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../../adapter/adminController"));
const adminAuthUsecase_1 = __importDefault(require("../../use_case/adminAuthUsecase"));
const adminAuthRepository_1 = __importDefault(require("../repository/adminAuthRepository"));
const repository = new adminAuthRepository_1.default();
const useCase = new adminAuthUsecase_1.default(repository);
const adminControl = new adminController_1.default(useCase);
const router = express_1.default.Router();
router.post('/login', (req, res) => adminControl.login(req, res));
router.post('/logout', (req, res) => adminControl.logout(req, res));
exports.default = router;
