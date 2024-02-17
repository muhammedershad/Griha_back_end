"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWTService_1 = __importDefault(require("../../use_case/interface/JWTService"));
const jwt = new JWTService_1.default();
const adminAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.admin_token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request",
            });
        }
        // Verify the token
        const auth = await jwt.verifyToken(token);
        // console.log(auth)
        if (!auth.success || auth.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request",
            });
        }
        // Attach user information to the request
        req.user = auth;
        next(); // Continue to the next middleware or route handler
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.default = adminAuthMiddleware;
