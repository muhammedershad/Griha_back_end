"use strict";
// import { UserModel } from '../database/userModel'
// import { ObjectId } from 'mongoose'
// class adminRepository {
//     async findAllByRole(userType: string) {
//         try {
//             console.log('find all user/tutors')
//             const userData = await UserModel.find({ role: userType })
//             if (userData) {
//                 return {
//                     status: 200,
//                     data: userData,
//                     message: 'User details found in database'
//                 }
//             }
//             else {
//                 return {
//                     status: 400,
//                     message: 'No Details found'
//                 }
//             }
//         } catch (error) {
//             return {
//                 status: 500,
//                 success: false,
//                 message: (error as Error).message
//             }
//         }
//     }
//     async findAndBlock(_id: ObjectId) {
//         try {
//             console.log('find all user/tutors')
//             const userData = await this.findById(_id)   //check if valid user 
//             if (!userData.success) {
//                 return {
//                     status: userData.status,
//                     message: userData.message,
//                 }
//             }
//             const blockStatus = userData.data?.isBlocked    //check if user is already blocked or not
//             const updatedData = await UserModel.updateOne({ _id }, { $set: { isBlocked: !blockStatus } })
//             if (updatedData) {
//                 return {
//                     status: 200,
//                     message: blockStatus ? `${userData.data?.role} unblocked` : `${userData.data?.role} blocked`
//                 }
//             }
//             else {
//                 return {
//                     status: 400,
//                     message: 'Unable to block/unblock user'
//                 }
//             }
//         } catch (error) {
//             return {
//                 status: 500,
//                 success: false,
//                 message: (error as Error).message
//             }
//         }
//     }
// }
// export default adminRepository
