import AdminModel from "../database/adminModel";
import Admin from "../../domain/admin";

class AdminAuthRepository {
    async login ( username: string ) {
        try {
            const admin = await AdminModel.findOne({ username: username })
            return admin
            // if ( admin ) {
            //     return {
            //         success: true,
            //         message: "Admin not found",
            //         admin
            //     }
            // } else {
            //     return {
            //         success: false,
            //         message: "Admin found",
            //         admin
            //     }
            // }
        } catch (error ) {
            console.log(error);
            return {
                success: false,
                message: (error as Error)?.message
            }
        }
    }
}

export default AdminAuthRepository;