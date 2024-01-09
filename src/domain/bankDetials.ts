import { ObjectId } from "mongoose";

export interface BankDetails extends Document {
    _id?: ObjectId;
    accountNumber: number;
    IFSCCode: string;
    bankName: string;
    PANNumber: string;
    UPIId: string;
    userId: ObjectId;
}