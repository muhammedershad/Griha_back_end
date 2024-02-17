"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
class MeetingUsecase {
    constructor(meetingRepository) {
        this.meetingRepository = meetingRepository;
    }
    async addTimeSlot(data) {
        try {
            const response = await this.meetingRepository.addTimeSlot(data);
            if (response)
                return { success: true, message: 'Time slot added successfully', timeSlot: response };
            else
                throw (0, http_errors_1.default)(500, 'failed to add time slot');
        }
        catch (error) {
            throw error;
        }
    }
    async getTimeSlotForEmployee(employeeId, date) {
        try {
            const response = await this.meetingRepository.getTimeSlotForEmployee(employeeId, date);
            if (response)
                return { success: true, message: 'Time slot data fetched successfully', timeSlots: response };
            else
                throw (0, http_errors_1.default)(500, 'Failed to fetch time slot data');
        }
        catch (error) {
            throw error;
        }
    }
    async cancelTimeSlot(meetingId) {
        try {
            const response = await this.meetingRepository.cancelTimeSlot(meetingId);
            if (response)
                return { success: true, message: 'Meeting cancelled successfully', timeSlots: response };
            else
                throw (0, http_errors_1.default)(500, 'Failed to cancel time slot');
        }
        catch (error) {
            throw error;
        }
    }
    async allTimeSlotForUser(department, date) {
        try {
            const response = await this.meetingRepository.allTimeSlotForUser(department, date);
            if (response)
                return { success: true, message: 'Time slots data fetched successfully', timeSlots: response };
            else
                throw (0, http_errors_1.default)(500, 'Failed to fetch time slots for user');
        }
        catch (error) {
            throw error;
        }
    }
    async bookMeeting(meetingId, userId) {
        try {
            const response = await this.meetingRepository.bookMeeting(meetingId, userId);
            if (response)
                return { success: true, message: 'Booking successful', };
            else
                throw (0, http_errors_1.default)(500, ' Booking failed');
        }
        catch (error) {
            throw error;
        }
    }
    async getScheduledMeetingOfUser(userId) {
        try {
            const response = await this.meetingRepository.getScheduledMeetingOfUser(userId);
            if (response)
                return { success: true, message: 'Data fetched successfully', meetings: response };
            else
                throw (0, http_errors_1.default)(500, 'Failed to fetch user meeting details');
        }
        catch (error) {
            throw error;
        }
    }
    async getScheduledMeetingOfEmployee(employeeId) {
        try {
            const response = await this.meetingRepository.getScheduledMeetingOfEmployee(employeeId);
            if (response)
                return { success: true, message: 'Data fetched successfully', meetings: response };
            else
                throw (0, http_errors_1.default)(500, 'Failed to fetch data');
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = MeetingUsecase;
