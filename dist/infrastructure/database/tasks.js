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
const TasksSchema = new mongoose_1.Schema({
    taskName: { type: String, required: true },
    shortDescription: { type: String, required: true },
    assignedTo: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Employees' },
    status: { type: String, required: true, default: "active" },
    dueDate: { type: Date, required: true },
    assignedDate: { type: Date, required: true, default: new Date() },
    assignedBy: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Employees' },
    attachments: [{ type: String }],
    updateDate: { type: Date, default: new Date() },
    department: { type: String, required: true },
    details: { type: String, required: true },
    project: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Projects' },
    priority: { type: String, required: true },
    comments: [
        {
            comment: { type: String },
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Employees",
            },
            time: { type: Date, default: new Date() },
        },
    ],
    response: [
        {
            details: { type: String },
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Employees",
            },
            time: { type: Date, default: new Date() },
            attachments: [{ type: String }],
        },
    ],
});
const Tasks = mongoose_1.default.model("Tasks", TasksSchema);
exports.default = Tasks;
