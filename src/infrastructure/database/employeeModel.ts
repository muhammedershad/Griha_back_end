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
    joinDate: Date;
    username: string;
    email: string;
    teamLead: boolean;
    isBlocked: boolean;
    isSenior: boolean;
}

const EmployeesSchema: Schema = new Schema({
    lastName: { type: String },
    firstName: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    department: { type: String, required: true },
    experience: { type: Number },
    jobRole: { type: String, required: true },
    joinDate: { type: Date, required: true },
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    teamLead: { type: Boolean, required: true, default: false },
    isBlocked: { type: Boolean, required: true, default: false },
    isSenior: { type: Boolean, required: true, default: false },
});

const Employees = mongoose.model<IEmployees>("Employees", EmployeesSchema);

export default Employees;
