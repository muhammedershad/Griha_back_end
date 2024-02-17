"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Declare the Schema of the Mongo model
var otpSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    expiresAt: {
        type: Date,
        default: new Date(Date.now() + 45 * 60 * 1000), // Set default expiration time to 45 minutes
        index: { expires: 0 },
    },
});
otpSchema.post('init', function (doc) {
    if (doc.createdAt) {
        // Update expiresAt to be 10 minutes after createdAt
        doc.expiresAt = new Date(doc.createdAt.getTime() + 10 * 60 * 1000);
    }
});
const OtpModel = mongoose_1.default.model('otp', otpSchema);
exports.OtpModel = OtpModel;
