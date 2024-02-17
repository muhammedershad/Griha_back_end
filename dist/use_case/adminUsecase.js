"use strict";
// import { ObjectId } from "mongoose";
// import User from "../domain/user";
// class adminUsecase {
//     private adminRepository: adminRepository;
//     constructor(adminRepository: adminRepository) {
//         this.adminRepository = adminRepository
//     }
//     async listUsers(user: User) {
//         console.log('inside useCase')
//         if (!user?.role) {
//             return {
//                 status: 400,
//                 message: "User Type missing in request",
//             }
//         }
//         const userFound = await this.adminRepository.findAllByRole(user.role)
//         return {
//             status: userFound.status,
//             message: userFound.message,
//             data: userFound.data,
//         }
//     }
//     async blockUsers(user: { _id: ObjectId }) {
//         console.log('inside useCase')
//         if (!user?._id) {
//             return {
//                 status: 400,
//                 message: "User ID missing in request",
//             }
//         }
//         const blockStatus = await this.adminRepository.findAndBlock(user._id)
//         return {
//             status: blockStatus.status,
//             message: blockStatus.message,
//         }
//     }
// }
// export default adminUsecase
