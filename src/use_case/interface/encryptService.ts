import bcrypt from "bcrypt";

export interface PasswordHashingService {
    hashData(data: string, saltRounds?: number): Promise<string>;
    verifyHashData(unhashed: String, hashed: String): Promise<boolean>;
}

export default class BcryptPasswordHashingService implements PasswordHashingService {

    async hashData(data: string, saltRounds = 10): Promise<string> {
        try {
            console.log('hasihng'+ data)
            const hashedData = await bcrypt.hash(data, saltRounds);
            return hashedData;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    async verifyHashData(unhashed: string, hashed: string): Promise<boolean> {
        try {
            const match = await bcrypt.compare(unhashed, hashed);
            return match;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }
}