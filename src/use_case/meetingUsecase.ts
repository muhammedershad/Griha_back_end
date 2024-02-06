import { IMeeting } from "../infrastructure/database/meeting";
import message from "../infrastructure/database/message";
import MeetingRepository from "../infrastructure/repository/meetingRepository";
import createError from 'http-errors'

class MeetingUsecase{
    private meetingRepository: MeetingRepository;
    constructor(meetingRepository: MeetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    async addTimeSlot(data: IMeeting) {
        try {
            const response = await this.meetingRepository.addTimeSlot(data)
            if(response) return { success: true, message: 'Time slot added successfully'}
            else throw createError(500, 'failed to add time slot')
        } catch (error) {
            throw error
        }
    } 

    async getTimeSlotForEmployee( employeeId: string, date: string ) {
        try {
            const response = await this.meetingRepository.getTimeSlotForEmployee(employeeId, date)
            if(response) return { success: true, message: 'Time slot data fetched successfully', timeSlots: response}
            else throw createError(500, 'Failed to fetch time slot data')
        } catch (error) {
            throw error
        }
    }
}

export default MeetingUsecase