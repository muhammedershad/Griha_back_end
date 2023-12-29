import mongoose, { Schema } from "mongoose";
import Otp from "../../domain/otp";

// Declare the Schema of the Mongo model
var otpSchema: Schema<Otp> = new mongoose.Schema({
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

const OtpModel = mongoose.model<Otp>('otp', otpSchema);
export { OtpModel };
