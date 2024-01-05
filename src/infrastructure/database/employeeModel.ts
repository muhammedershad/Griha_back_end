import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IEmployees extends Document {
    _id: ObjectId;
    lastName: string;
    firstName: string;
    password: string;
    phone: number;
    department: string;
    experience: number;
    jobRole: string;
    joinedDate: Date;
    username: string;
    email: string;
    teamLead: boolean;
    isBlocked: boolean;
    isSenior: boolean;
    image: string;
}

const EmployeesSchema: Schema = new Schema({
    lastName: { type: String },
    firstName: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number },
    department: { type: String, required: true },
    experience: { type: Number },
    jobRole: { type: String, required: true },
    joinedDate: { type: Date, required: true, default: new Date() },
    username: { type: String},
    email: { type: String, required: true, unique: true },
    teamLead: { type: Boolean, required: true, default: false },
    isBlocked: { type: Boolean, required: true, default: false },
    isSenior: { type: Boolean, required: true, default: false },
    image: { type: String },
});

const Employees = mongoose.model<IEmployees>("Employees", EmployeesSchema);

export default Employees;
