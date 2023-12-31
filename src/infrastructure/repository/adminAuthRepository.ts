import AdminModel from "../database/adminModel";
import Admin from "../../domain/admin";

class AdminAuthRepository {
    async login(username: string) {
        try {
            const admin = await AdminModel.findOne({ username: username });
            return admin;
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: (error as Error)?.message,
            };
        }
    }
}

export default AdminAuthRepository;
