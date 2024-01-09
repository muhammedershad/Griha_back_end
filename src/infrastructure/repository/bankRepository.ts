import { ObjectId } from "mongoose";
import { BankDetails } from "../../domain/bankDetials";
import BankDetailsModel from '../database/bankDetails'

class BankRepository {
    async updateEmployeeBankDetails(data: BankDetails) {
        try {
            const response = await BankDetailsModel.findOneAndUpdate(
                { userId: data.userId },
                {
                    bankName: data.bankName,
                    accountNumber: data.accountNumber,
                    IFSCCode: data.IFSCCode,
                    PANNumber: data.PANNumber,
                    UPIId: data.UPIId,
                    userId: data.userId
                },
                { upsert: true, new: true }
            );
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async getUserBankDetails(userId: string | ObjectId ) {
        try {
            const response = await BankDetailsModel.findOne({userId: userId})
            return response
        } catch (error) {
            console.log(error);
        }
    }
}

export default BankRepository