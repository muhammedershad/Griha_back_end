import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IPayment extends Document {
  _id: ObjectId;
  paidBy: ObjectId;
  paidTo: ObjectId;
  purpose: String;
  paymentType: String;
  status: String;
  amount: Number;
  bonus: Number;
  project: ObjectId;
  progress: ObjectId
}

const PaymentSchema: Schema = new Schema({
  paidBy: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  paidTo: { type: Schema.Types.ObjectId, required: true },
  purpose: { type: String, required: true },
  paymentType: { type: String, required: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
  bonus: { type: Number,},
  project: { type: Schema.Types.ObjectId, ref: 'Projects'},
  progress: { type: Schema.Types.ObjectId, res: 'Projects.progress'}
});

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;

