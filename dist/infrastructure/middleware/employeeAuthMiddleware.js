"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWTService_1 = __importDefault(require("../../use_case/interface/JWTService"));
const jwt = new JWTService_1.default();
const employeeAuthMiddleware = async (req, res, next) => {
    try {
        // console.log(req.cookies.employee_token,'cookies');
        const token = req.cookies.employee_token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request",
            });
        }
        // Verify the token
        const auth = await jwt.verifyToken(token);
        // console.log(auth)
        if (!auth.success || auth.role !== 'employee') {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request",
            });
        }
        // console.log(auth,'auth')
        // Attach user information to the request
        // req.user = auth.data.userData;
        next(); // Continue to the next middleware or route handler
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.default = employeeAuthMiddleware;
