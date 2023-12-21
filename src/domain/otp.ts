interface Otp {
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    phoneNumber: number,
    otp: string,
    createdAt: Date,
    expiresAt: Date,
}

export default Otp