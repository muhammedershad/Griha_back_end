import { NextFunction, Request, Response } from "express";
import TasksUsecase from "../use_case/tasksUsecase";
import createError from 'http-errors'

class TasksController {
    private tasksUsecase: TasksUsecase;
    constructor( tasksUsecase: TasksUsecase ) {
        this.tasksUsecase = tasksUsecase
    }

    async test (req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({ success: true })
        } catch (error) {
            next(error)
        }
    }

    async createTask (req: Request, res: Response, next: NextFunction) {
        try {
            let { taskName, shortDescription, details, assignedBy, dueDate, department, assignedTo, project, attachments} = req.body

            console.log(req.body)

            if( !taskName.trim() ) throw createError(400, 'Invalid task name')
            if( !shortDescription.trim() ) throw createError(400, 'invalid short description')
            if( !details.trim() ) throw createError(400, 'Invalid details')
            if( !assignedBy.trim() ) throw createError(400, 'Invalid assigned person id')
            if( !dueDate.trim() ) throw createError(400, 'Invalid due date')
            if( !department.trim() ) throw createError(400, 'Invalid department')
            if( !assignedTo.trim() ) throw createError(400, 'Invalid assigned to person id')
            if( !project.trim() ) throw createError(400, 'Invalid project id')
            
            const response = await this.tasksUsecase.createTask(req.body)
            if(response.success) return res.status(200).json(response)

        } catch (error) {
            next(error)
        }
    }

    async getAllTasksByProject(req: Request, res: Response, next: NextFunction) {
        try {
            const proejctId = req.params.projectId

            if( !proejctId.trim() ) throw createError(400, 'Invalid projectId')

            const response = await this.tasksUsecase.getAllTasksByProject(proejctId)
            if(response?.success) return res.status(200).json(response)

        } catch (error) {
            next(error)
        }
    }

    async employeeAllTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const employeeId = req.params.employeeId

            if(!employeeId) throw createError(400, 'Invalid employee id')

            const response = await this.tasksUsecase.employeeAllTasks(employeeId)
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async taskDetials(req: Request, res: Response, next: NextFunction) {
        try {
            const taskId = req.params.taskId
            if(!taskId) throw createError(400, 'Invalid task Id')
            const response = await this.tasksUsecase.taskDetials(taskId)
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async addResponse(req: Request, res: Response, next: NextFunction) {
        try {
            let { taskId, details, user, attachments } = req.body
            console.log(req.body);
            
            req.body.taskId = null

            if(!taskId.trim()) throw createError(400, 'Invalid task id')
            if(!details.trim()) throw createError(400, 'Invalid details')
            if(!user.trim()) throw createError(400, 'Invalid user id')

            const response = await this.tasksUsecase.addResponse( taskId, req.body )
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async addComment(req: Request, res: Response, next: NextFunction) {
        try {
            const { comment, user, taskId } = req.body
            if( !comment.trim()) throw createError(400, 'Invalid comment')
            if( !user.trim()) throw createError(400, 'Invalid user id')
            if( !taskId.trim()) throw createError(400, 'Invalid taks id')

            const response = await this.tasksUsecase.addComment(taskId, req.body)
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

}

export default TasksController