interface Otp {
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    phone: string,
    otp: string | null,
    createdAt: Date,
    expiresAt: Date,
}

export default Otp