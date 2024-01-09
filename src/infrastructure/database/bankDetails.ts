import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IBankDetails extends Document {
  _id: ObjectId;
  accountNumber: Number;
  IFSCCode: String;
  bankName: String;
  PANNumber: String;
  UPIId: String;
  userId: ObjectId;
}

const BankDetailsSchema: Schema = new Schema({
  accountNumber: { type: Number, required: true },
  IFSCCode: { type: String, required: true },
  bankName: { type: String, required: true },
  PANNumber: { type: String, required: true },
  UPIId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
});

const BankDetails = mongoose.model<IBankDetails>('BankDetails', BankDetailsSchema);

export default BankDetails;