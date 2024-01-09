import { ObjectId } from "mongoose";

export interface ChangePassword {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
    id: string | ObjectId
}