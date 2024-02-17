"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminModel_1 = __importDefault(require("../database/adminModel"));
class AdminAuthRepository {
    async login(username) {
        try {
            const admin = await adminModel_1.default.findOne({ username: username });
            return admin;
        }
        catch (error) {
            console.log(error);
            return {
                success: false,
                message: error === null || error === void 0 ? void 0 : error.message,
            };
        }
    }
}
exports.default = AdminAuthRepository;
