import Admin from "../domain/admin";
import { IAdmin } from "../infrastructure/database/adminModel";
import AdminAuthRepository from "../infrastructure/repository/adminAuthRepository"
import JWTService from "./interface/JWTService";
import BcryptPasswordHashingService from "./interface/encryptService";
const bycrypt = new BcryptPasswordHashingService()
const jwt = new JWTService()

class AdminAuthUsecase {
    private adminAuthRepository: AdminAuthRepository;
    constructor(adminAuthRepository: AdminAuthRepository) {
        this.adminAuthRepository = adminAuthRepository;
    }

    async login ( username: string, password: string) {
        try {
            const admin: any = await this.adminAuthRepository.login( username )
            if ( admin ) {
                const match = await bycrypt.verifyHashData( password, admin?.password )
                if ( match ) {
                    const token = await jwt.createToken( admin?.username, 'admin' )
                    console.log( token )
                    return {
                        success: true,
                        token,
                        admin
                    }
                } else {
                    return {
                        success: false,
                        message: 'Incorrect password'
                    }
                }
            } else {
                return {
                    success: false,
                    message: 'Admin not found'
                }
            }

        } catch (error) {
            console.log(error);
            
        }
    }
}

export default AdminAuthUsecase