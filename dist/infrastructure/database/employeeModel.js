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
const EmployeesSchema = new mongoose_1.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    PhoneNumber: { type: Number, required: true },
    JobRole: {
        Department: { type: String, required: true },
        Experience: { type: Number, required: true },
        JobRole: { type: String, required: true },
        JoinDate: { type: Date, required: true },
    },
    BankDetails: {
        AccountNumber: { type: Number, required: true },
        BankName: { type: String, required: true },
        IFSCcode: { type: String, required: true },
        PanNumber: { type: String, required: true },
        UpiId: { type: String, required: true },
    },
    Email: { type: String, required: true, unique: true },
    TeamLead: { type: Boolean, required: true },
    IsBlocked: { type: Boolean, required: true },
    IdApproved: { type: Boolean, required: true },
    IsSenior: { type: Boolean, required: true },
});
const EmployeeModel = mongoose_1.default.model('Employees', EmployeesSchema);
exports.default = EmployeeModel;
