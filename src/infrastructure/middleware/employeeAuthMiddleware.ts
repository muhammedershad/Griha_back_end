import { Request, Response, NextFunction } from "express";
import JWTService from "../../use_case/interface/JWTService";

const jwt = new JWTService();

const employeeAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.cookies.employee_token,'cookies');
        
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
        req.user = auth;
    

        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default employeeAuthMiddleware;