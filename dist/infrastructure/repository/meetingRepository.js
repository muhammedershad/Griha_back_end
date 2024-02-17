"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meeting_1 = __importDefault(require("../database/meeting"));
class MeetingRepository {
    async addTimeSlot(data) {
        try {
            const timeSlot = new meeting_1.default(data);
            const response = await timeSlot.save();
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getTimeSlotForEmployee(employeeId, date) {
        try {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
            const meeting = await meeting_1.default.find({
                time: { $gte: startDate, $lte: endDate },
                employee: employeeId,
                status: "active",
            }).populate("user", "name");
            return meeting;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async cancelTimeSlot(meetingId) {
        try {
            const response = meeting_1.default.findByIdAndUpdate(meetingId, {
                $set: {
                    status: "cancelled",
                },
            }, { new: true });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async allTimeSlotForUser(department, date) {
        try {
            const selectedDate = new Date(date);
            const today = new Date();
            const isToday = selectedDate.toISOString().split("T")[0] ===
                today.toISOString().split("T")[0];
            let startDate;
            let endDate;
            if (isToday) {
                startDate = today;
                endDate = new Date(today);
                endDate.setHours(23, 59, 59, 999);
            }
            else {
                startDate = new Date(selectedDate);
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date(selectedDate);
                endDate.setHours(23, 59, 59, 999);
            }
            const meeting = await meeting_1.default.find({
                time: { $gte: startDate, $lte: endDate },
                department,
                status: "active",
            }).populate("user", "name");
            console.log(meeting);
            return meeting;
        }
        catch (error) {
            throw error;
        }
    }
    async bookMeeting(meetingId, userId) {
        try {
            const response = await meeting_1.default.findByIdAndUpdate(meetingId, { $set: { user: userId, status: 'booked' } }, { new: true }).populate('user');
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getScheduledMeetingOfUser(userId) {
        try {
            const response = await meeting_1.default.find({ user: userId, status: 'booked' }).populate('user');
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getScheduledMeetingOfEmployee(employeeId) {
        try {
            const response = await meeting_1.default.find({ employee: employeeId, status: 'booked' }).populate('user');
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = MeetingRepository;
