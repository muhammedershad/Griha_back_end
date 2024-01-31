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

    async userProject( req: Request, res: Response, next: NextFunction ) {
        try {
            const userId = req.params.userId
            if (!userId) throw createError(400, 'User id is missing')

            const response = await this.projectUseCase.userProject(userId)
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
            let { projectName, address, location, teamLead, teamMembers, clients } = req.body
            
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

    async addProgress (req: Request, res: Response, next: NextFunction) {
        try {
            let { title, shortDiscription, details, imageUrls, videoUrls, otherFileUrls, postedBy } = req.body
            let projectId = req.params.projectId
            console.log(req.body, req.params);
            

            if(!title.trim()) throw createError(400, 'Enter valid task name')
            if(!shortDiscription.trim()) throw createError(400, 'Enter valid short description about the progress')
            if(!details.trim()) throw createError(400, 'Enter details')
            if(!postedBy.trim()) throw createError(400, 'Employee id is missing')
            if(!projectId.trim()) throw createError(400, 'Project id is missing')

            const response = await this.projectUseCase.addProgress(req.body, projectId)
            if (response.success) return res.status(200).json(response) 
        } catch (error) {
            next(error)
        }
    }

    async allPorjects(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('here')
            const response = await this.projectUseCase.allPorjects()
            if (response.success) return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async addFeaturedProject(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('here')
            let {projectName, cilent, siteArea, location, builtupArea, youtubeLink, category, details, images} = req.body
            
            const response = await this.projectUseCase.addFeaturedProject(req.body)
            if (response) return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async updateFeaturedProject(req: Request, res: Response, next: NextFunction) {
        try {
            let {projectName, cilent, siteArea, location, builtupArea, youtubeLink, category, details, images, _id} = req.body

            const response = await this.projectUseCase.updateFeaturedProject(req.body)
            if (response) return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async allFeaturedProjects(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("here controller")
            const category = req.params.category.trim()
            const search: string = req.query.search ? req.query.search.toString() : '';
            const page: number = parseInt(req.query.page as string) || 1; 
            const response = await this.projectUseCase.allFeaturedProjects(category, search, page)
            if(response) return res.status(200).json(response)
        } catch (error) {
            console.log('error')
            // next(error)
        }
    }

    async featuredPorjectDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const projectId = req.params.projectId
            if(!projectId) throw createError(400, 'Invalid Project Id')

            const response = await this.projectUseCase.featuredPorjectDetails(projectId)
            if(response) return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    // async projectProgress(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const projectId = req.params.projectId
    //         const progressId = req.params.progressId            
    //         if(!projectId) throw createError(400, 'Invalid Project Id')
    //         if(!progressId) throw createError(400, 'Invalid Progress Id')

    //         const response = await this.projectUseCase.projectProgress(projectId, progressId)
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    
    async addComment(req: Request, res: Response, next: NextFunction) {
        try {
            let { comment, projectId, progressId, userId } = req.body
            if(!comment.trim()) throw createError(400, 'Invalid commment')
            if(!projectId.trim()) throw createError(400, 'Invalid project id')
            if(!progressId.trim()) throw createError(400, 'Invalid progress id')
            if(!userId.trim()) throw createError(400, 'Invalid user id')

            const response = await this.projectUseCase.addComment(comment, projectId, progressId, userId)
            if(response) return res.status(200).json(response)
            
        } catch (error) {
            next(error)
        }
    }
}

export default ProjectController;


