"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptPasswordHashingService {
    async hashData(data, saltRounds = 10) {
        try {
            console.log("hasihng" + data);
            const hashedData = await bcrypt_1.default.hash(data, saltRounds);
            return hashedData;
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    async verifyHashData(unhashed, hashed) {
        try {
            // console.log("unhash", unhashed, hashed, "hasing");
            const match = await bcrypt_1.default.compare(unhashed, hashed);
            return match;
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}
exports.default = BcryptPasswordHashingService;
