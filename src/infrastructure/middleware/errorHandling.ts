import { NextFunction, Request, Response } from "express";

const errorHandling = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err);
    return res
        .status(err.status || 500)
        .json({
            success: false,
            statusCode: err.status || 500,
            message: err.message || "Internal server error",
        });
};

export default errorHandling;
