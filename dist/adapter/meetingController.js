"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
class MeetingController {
    constructor(meetingUsecase) {
        this.meetingUsecase = meetingUsecase;
    }
    async test(req, res, next) {
        try {
            res.status(200).json({ success: true });
        }
        catch (error) {
            next(error);
        }
    }
    async addTimeSlot(req, res, next) {
        {
            try {
                const { time, employee, department } = req.body;
                console.log(req.body);
                if (!time.trim())
                    throw (0, http_errors_1.default)(400, 'Invalid time');
                if (!employee.trim())
                    throw (0, http_errors_1.default)(400, 'Invalid employee id');
                if (!department.trim())
                    throw (0, http_errors_1.default)(400, 'Invalid department');
                const response = await this.meetingUsecase.addTimeSlot(req.body);
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        }
    }
    async getTimeSlotForEmployee(req, res, next) {
        try {
            const { employeeId, date } = req.query;
            if (!(employeeId === null || employeeId === void 0 ? void 0 : employeeId.trim()))
                throw (0, http_errors_1.default)(400, 'Invalid employee id');
            if (!date)
                throw (0, http_errors_1.default)(400, 'Invalid date');
            const response = await this.meetingUsecase.getTimeSlotForEmployee(employeeId, date);
            return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async cancelTimeSlot(req, res, next) {
        try {
            let { meetingId } = req.params;
            if (!meetingId.trim())
                throw (0, http_errors_1.default)(400, 'Invalid meeting id');
            const response = await this.meetingUsecase.cancelTimeSlot(meetingId);
            return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async allTimeSlotForUser(req, res, next) {
        try {
            const { department, date } = req.query;
            if (!department)
                throw (0, http_errors_1.default)(400, 'Invalid department');
            if (!department.trim())
                throw (0, http_errors_1.default)(400, 'Invalid department');
            if (!(date === null || date === void 0 ? void 0 : date.trim()))
                throw (0, http_errors_1.default)(400, 'Invalid date');
            const response = await this.meetingUsecase.allTimeSlotForUser(department, date);
            return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async bookMeeting(req, res, next) {
        try {
            const { meetingId, userId } = req.query;
            if (!(meetingId === null || meetingId === void 0 ? void 0 : meetingId.trim()))
                throw (0, http_errors_1.default)(400, 'Invalid meeting id');
            if (!(userId === null || userId === void 0 ? void 0 : userId.trim()))
                throw (0, http_errors_1.default)(400, 'Invalid user id');
            const response = await this.meetingUsecase.bookMeeting(meetingId, userId);
            return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async getScheduledMeetingOfUser(req, res, next) {
        try {
            const { userId } = req.query;
            if (!userId || !userId.trim())
                throw (0, http_errors_1.default)(400, 'Invalid user id');
            const response = await this.meetingUsecase.getScheduledMeetingOfUser(userId);
            return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async getScheduledMeetingOfEmployee(req, res, next) {
        try {
            const { employeeId } = req.query;
            if (!employeeId || !employeeId.trim())
                throw (0, http_errors_1.default)(400, 'Invlaid employee id');
            const response = await this.meetingUsecase.getScheduledMeetingOfEmployee(employeeId);
            return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = MeetingController;
