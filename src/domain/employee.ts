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
}
