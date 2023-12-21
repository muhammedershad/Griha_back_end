import jwt, { JwtPayload } from 'jsonwebtoken'

export interface TokenService {
    createToken(data: string, role: string): Promise<string>;
}
interface DecodedToken extends JwtPayload {
    role: string; // added extra 'role' property
}

export default class JWTService implements TokenService {
    async createToken(data: string, role: string): Promise<string> {
        try {
            const token = await jwt.sign({ userData: data, role: role }, "Learners$2_SecretKey", { expiresIn: '24h' });
            // console.log("TokenType",typeof(token))
            return token

        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }
    async verifyToken(tokenData: string) {
        try {
            const token = await jwt.verify(tokenData, "Learners$2_SecretKey");
            if (!token) return {         //invalid token handling
                status: 401,
                message: 'Unauthorized Access',
            }
            // console.log("Token", token)
            const decodedToken = token as DecodedToken; //to add role to default token structure
            return {
                status: 200,
                data: decodedToken,
                role: decodedToken?.role
            }

        } catch (error) {
            console.log((error as Error).message);
            return {
                status: 400,
                message: (error as Error).message,
            }
        }
    }

}