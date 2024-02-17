"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandling = (err, req, res, next) => {
    console.log(err);
    return res
        .status(err.status || 500)
        .json({
        success: false,
        statusCode: err.status || 500,
        message: err.message || "Internal server error",
    });
};
exports.default = errorHandling;
