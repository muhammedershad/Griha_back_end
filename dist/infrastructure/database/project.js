"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ProjectsSchema = new mongoose_1.Schema({
    projectName: { type: String, required: true },
    location: { type: String },
    details: { type: String, required: true },
    clients: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Users" }],
    postedBy: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Employees" },
    time: { type: Date, required: true, default: new Date() },
    team: {
        members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Employees" }],
        teamLead: {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: "Employees",
        },
    },
    address: {
        address: { type: String, required: true },
        district: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
    },
    progress: [
        {
            title: { type: String },
            date: { type: Date, default: new Date() },
            shortDiscription: { type: String },
            details: { type: String },
            postedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Employees" },
            imageUrls: [{ type: String }],
            videoUrls: [{ type: String }],
            otherFileUrls: [{ type: String }],
            comments: [
                {
                    comment: { type: String },
                    user: {
                        type: mongoose_1.Schema.Types.ObjectId,
                        ref: "Employees" || "Users",
                    },
                    time: { type: Date, default: new Date() },
                },
            ],
        },
    ],
});
const ProjectModel = mongoose_1.default.model("Projects", ProjectsSchema);
exports.default = ProjectModel;
