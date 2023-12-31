import { ObjectId } from "mongoose"

interface User {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    image: string,
    IsBlocked: boolean,
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
