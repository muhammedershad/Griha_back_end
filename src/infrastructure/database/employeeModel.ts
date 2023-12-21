import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IEmployees extends Document {
  _id: ObjectId;
  FirstName: String;
  LastName: String;
  Username: String;
  Password: String;
  PhoneNumber: Number;
  jobRole: {
     Department: String;
     Experience: Number;
     JobRole: String;
     JoinDate: Date;
  };
  bankDetails: {
     AccountNumber: Number;
     BankName: String;
     IFSCcode: String;
     PanNumber: String;
     UpiId: String;
  };
  Email: String;
  TeamLead: Boolean;
  IsBlocked: Boolean;
  IdApproved: Boolean;
  IsSenior: Boolean;
}

const EmployeesSchema: Schema = new Schema({
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

const EmployeeModel = mongoose.model<IEmployees>('Employees', EmployeesSchema);

export default EmployeeModel;
