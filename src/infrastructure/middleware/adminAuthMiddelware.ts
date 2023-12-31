import { Request, Response, NextFunction } from "express";
import JWTService from "../../use_case/interface/JWTService";

const jwt = new JWTService();

const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        console.log(token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request",
            });
        }
       
        // Verify the token
        const auth = await jwt.verifyToken(token);
        console.log(auth)
        if (!auth.success || auth.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Request",
            });
        }

        // Attach user information to the request
        req.user = auth;
    

        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default adminAuthMiddleware;