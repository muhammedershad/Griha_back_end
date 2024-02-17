"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bankDetails_1 = __importDefault(require("../database/bankDetails"));
class BankRepository {
    async updateEmployeeBankDetails(data) {
        try {
            const response = await bankDetails_1.default.findOneAndUpdate({ userId: data.userId }, {
                bankName: data.bankName,
                accountNumber: data.accountNumber,
                IFSCCode: data.IFSCCode,
                PANNumber: data.PANNumber,
                UPIId: data.UPIId,
                userId: data.userId
            }, { upsert: true, new: true });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getUserBankDetails(userId) {
        try {
            const response = await bankDetails_1.default.findOne({ userId: userId });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = BankRepository;
