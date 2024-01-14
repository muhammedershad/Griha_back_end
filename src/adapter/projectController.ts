import { NextFunction } from "express-serve-static-core";
import ProjectUseCase from "../use_case/projectUseCase";
import { Request, Response } from "express";
import createError from 'http-errors'
import { createAbstractBuilder } from "typescript";
import { IProjects } from "../infrastructure/database/project";

class ProjectController {
    private projectUseCase: ProjectUseCase;
    constructor(projectUseCase: ProjectUseCase) {
        this.projectUseCase = projectUseCase;
    }

    test(req: Request, res: Response, next: NextFunction) {
        try {
            // throw createError(403,'just a error')
            return res.status(200).json({ success: true })
        } catch (error) {
            next(error)
        }
    }

    async createProject(req: Request, res: Response, next: NextFunction) {
        try {
            let { projectName, postedBy, clients, details, location, team, address } = req.body 
            if (!projectName.trim()) throw createError(400, 'Enter valid project name')
            if (!postedBy.trim()) throw createError(400, 'Project creator details not avilable')
            if (!details.trim()) throw createError(400, 'Enter the details')
            if (!location.trim()) throw createError(400, 'Enter valid locatoin')
            if (!address?.address.trim()) throw createError(400, 'Enter valid address')
            if (!address.district.trim()) throw createError(400, 'Enter valid district')
            if (!address.state.trim()) throw createError(400, 'Enter valid state')
            if (!address.pincode.trim()) throw createError(400, 'Enter valid pin code')

            const response = await this.projectUseCase.createProject(req.body)
            if (response) {
                return res.status(200).json(response)
            }
                   
        } catch (error) {
            next(error)
        }
    }

    async employeeProject (req: Request, res: Response, next: NextFunction) {
        try {
            const employeeId = req.params.employeeId
            if (!employeeId) throw createError(400, 'Employee id is missing')

            const response = await this.projectUseCase.employeeProject(employeeId)
            if (response) return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    } 

    async projectDetails (req: Request, res: Response, next: NextFunction) {
        try {
            const projectId: string = req.params.projectId
            
            if (!projectId) throw createError(400, 'Project id is missing')
            
            const response = await this.projectUseCase.projectDetails(projectId)
            if (response) res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async updateProject (req: Request, res: Response, next: NextFunction) {
        try {
            const projectId = req.params.projectId
            let { projectName, address, location, teamLead } = req.body
            
            if(!projectName.trim()) throw createError(400, 'Enter valid project name')
            if(!address.address.trim()) throw createError(400, 'Enter valid address')
            if(!address.district.trim()) throw createError(400, 'Enter valid distric')
            if(!address.state.trim()) throw createError(400, 'Enter valid state')
            if(!address.pincode.trim()) throw createError(400, 'Enter vaild pincode')
            if(!location.trim()) throw createError(400, 'Enter valid details')
            if(!projectId.trim()) throw createError(400, 'Invalid project id')
            if(!teamLead.trim()) throw createError(400, 'Select the team lead')

            const response = await this.projectUseCase.editProject(projectId, req.body)
            if (response) return res.status(200).json(response)
            
        } catch (error) {
            next(error)
        }
    }
    
}

export default ProjectController;


