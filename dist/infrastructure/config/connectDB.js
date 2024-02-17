"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const connectDb = async () => {
    try {
        const mongo_uri = process.env.MONGODB_URL;
        await mongoose_1.default.connect(mongo_uri);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectDb = connectDb;
