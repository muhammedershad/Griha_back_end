import { ObjectId } from "mongoose"

interface User {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    image: string,
    isBlocked: boolean,
    username: string,
    address: {
        streetAddress: string,
        landmark: string,
        city: string,
        state: string,
        country: string,
        pincode: string,
    },
    createdAt: Date,
}

export default User



export interface QueryType extends Document {
    tutorId: ObjectId;
}