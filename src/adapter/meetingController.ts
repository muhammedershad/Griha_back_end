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
}

export default MeetingController