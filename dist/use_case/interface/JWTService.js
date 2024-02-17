"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY || "";
class JWTService {
    async createToken(data, role) {
        try {
            const token = jsonwebtoken_1.default.sign({ userData: data, role: role }, secretKey, {
                expiresIn: "24h",
            });
            // console.log("TokenType", typeof token, token);
            return token;
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    async verifyToken(tokenData) {
        try {
            const token = jsonwebtoken_1.default.verify(tokenData, secretKey);
            if (!token)
                return {
                    //invalid token handling
                    success: true,
                    status: 401,
                    message: "Unauthorized Access",
                };
            // console.log("Token", token)
            const decodedToken = token; //to add role to default token structure
            return {
                success: true,
                status: 200,
                data: decodedToken,
                role: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role,
            };
        }
        catch (error) {
            console.log(error.message);
            return {
                status: 400,
                message: error.message,
            };
        }
    }
}
exports.default = JWTService;
