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
            if(response) return { success: true, message: 'Time slot added successfully', timeSlot: response }
            else throw createError(500, 'failed to add time slot', )
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

    async cancelTimeSlot( meetingId: string ) {
        try {
            const response = await this.meetingRepository.cancelTimeSlot(meetingId)
            if(response) return { success: true, message: 'Meeting cancelled successfully', timeSlots: response}
            else throw createError(500, 'Failed to cancel time slot')
        } catch (error) {
            throw error
        }
    }

    async allTimeSlotForUser(department: string, date: string) {
        try {
            const response = await this.meetingRepository.allTimeSlotForUser(department, date)
            if(response) return { success: true, message: 'Time slots data fetched successfully', timeSlots: response}
            else throw createError(500, 'Failed to fetch time slots for user')
        } catch (error) {
            throw error
        }
    }

    async bookMeeting( meetingId: string, userId: string ) {
        try {
            const response = await this.meetingRepository.bookMeeting( meetingId, userId ) 
            if(response) return { success: true, message:'Booking successful',}
            else throw createError(500, ' Booking failed')
        } catch (error) {
            throw error
        }
    }

    async getScheduledMeetingOfUser( userId: string ) {
        try {
            const response = await this.meetingRepository.getScheduledMeetingOfUser(userId)
            if(response) return { success: true, message: 'Data fetched successfully', meetings: response}
            else throw createError(500, 'Failed to fetch user meeting details')
        } catch (error) {
            throw error
        }
    }

    async getScheduledMeetingOfEmployee( employeeId: string ) {
        try {
            const response = await this.meetingRepository.getScheduledMeetingOfEmployee( employeeId ) 
            if(response) return { success: true, message: 'Data fetched successfully' , meetings: response}
            else throw createError(500, 'Failed to fetch data')
        } catch (error) {
            throw error
        }
    }
}

export default MeetingUsecase