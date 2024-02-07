import { NextFunction, Request, Response } from "express-serve-static-core";
import MeetingUsecase from "../use_case/meetingUsecase";
import createError from 'http-errors'

class MeetingController {
    private meetingUsecase: MeetingUsecase;
    constructor( meetingUsecase: MeetingUsecase ) {
        this.meetingUsecase = meetingUsecase
    }

    async test (req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({ success: true })
        } catch (error) {
            next(error)
        }
    }

    async addTimeSlot (req: Request, res: Response, next: NextFunction) {{
        try {
            const { time, employee, department } = req.body
            console.log(req.body);
            
            if(!time.trim()) throw createError(400, 'Invalid time')
            if(!employee.trim()) throw createError(400, 'Invalid employee id')
            if(!department.trim()) throw createError(400, 'Invalid department')

            const response = await this.meetingUsecase.addTimeSlot(req.body)
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }}

    async getTimeSlotForEmployee (req: Request, res: Response, next: NextFunction) {
        try {
            const { employeeId, date }: { employeeId?: string; date?: string } = req.query;
        
            if (!employeeId?.trim()) throw createError(400, 'Invalid employee id');
            if (!date) throw createError(400, 'Invalid date');
        
            const response = await this.meetingUsecase.getTimeSlotForEmployee( employeeId, date )
            return res.status(200).json(response)
          } catch (error) {
            next(error);
          }
    }

    async cancelTimeSlot (req: Request, res: Response, next: NextFunction) {
        try {
            let { meetingId } = req.params
            if(!meetingId.trim()) throw createError(400, 'Invalid meeting id')
            const response = await this.meetingUsecase.cancelTimeSlot( meetingId )
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async allTimeSlotForUser( req: Request, res: Response, next: NextFunction ) {
        try {
            const { department, date }: { department?: string; date?: string } = req.query;
            if(!department) throw createError(400, 'Invalid department')
            if(!department.trim()) throw createError(400, 'Invalid department')
            if(!date?.trim()) throw createError(400, 'Invalid date')

            const response = await this.meetingUsecase.allTimeSlotForUser(department, date)
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async bookMeeting( req: Request, res: Response, next: NextFunction ) {
        try {
            const { meetingId, userId }: { meetingId?: string; userId?: string } = req.query;
            if(!meetingId?.trim()) throw createError(400, 'Invalid meeting id')
            if(!userId?.trim()) throw createError(400, 'Invalid user id')

            const response = await this.meetingUsecase.bookMeeting( meetingId, userId )
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async getScheduledMeetingOfUser( req: Request, res: Response, next: NextFunction ) {
        try {
            const { userId }: { userId?: string } = req.query
            if(!userId || !userId.trim()) throw createError(400, 'Invalid user id')

            const response = await this.meetingUsecase.getScheduledMeetingOfUser( userId )
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async getScheduledMeetingOfEmployee( req: Request , res: Response, next: NextFunction ) {
        try {
            const { employeeId }: { employeeId?: string } = req.query
            if( !employeeId || !employeeId.trim()) throw createError(400, 'Invlaid employee id')

            const response = await this.meetingUsecase.getScheduledMeetingOfEmployee( employeeId )
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

export default MeetingController