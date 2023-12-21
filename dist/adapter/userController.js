"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validations_1 = require("../use_case/interface/validations");
class userController {
    constructor(usercase) {
        this.usercase = usercase;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log('userController',req.body)   //test
                let { firstName, lastName, email, phone, password } = req.body;
                firstName = firstName.trim();
                lastName = lastName.trim();
                email = email.trim();
                phone = phone.trim();
                if (!firstName || !email || !password || !phone) {
                    return res.status(400).json({ success: false, message: "Missing required fields" });
                }
                if (!(0, validations_1.isValidName)(firstName)) { // Validate email format
                    return res.status(400).json({ success: false, message: "Invalid Name" });
                }
                if (!(0, validations_1.isValidEmail)(email)) { // Validate email format
                    return res.status(400).json({ success: false, message: "Invalid email format" });
                }
                if (!(0, validations_1.isValidPhoneNumber)(phone)) { // Validate phone number
                    return res.status(400).json({ success: false, message: "Invalid phone number" });
                }
                if (!(0, validations_1.isValidPassword)(password)) { // Validate password
                    return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
                }
                const user = yield this.usercase.register(req.body);
                res.status(200).json(user);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error.message });
            }
        });
    }
}
exports.default = userController;
