"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWTService_1 = __importDefault(require("./interface/JWTService"));
const encryptService_1 = __importDefault(require("./interface/encryptService"));
const bycrypt = new encryptService_1.default();
const jwt = new JWTService_1.default();
class AdminAuthUsecase {
    constructor(adminAuthRepository) {
        this.adminAuthRepository = adminAuthRepository;
    }
    async login(username, password) {
        try {
            const admin = await this.adminAuthRepository.login(username);
            if (admin) {
                const match = await bycrypt.verifyHashData(password, admin === null || admin === void 0 ? void 0 : admin.password);
                if (match) {
                    const token = await jwt.createToken(admin === null || admin === void 0 ? void 0 : admin.username, 'admin');
                    // console.log( token )
                    return {
                        success: true,
                        token,
                        admin
                    };
                }
                else {
                    return {
                        success: false,
                        message: 'Incorrect password'
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: 'Admin not found'
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = AdminAuthUsecase;
