import { NextFunction } from "express-serve-static-core";
import ProjectUseCase from "../use_case/projectUseCase";
import { Request, Response } from "express";
import createError from 'http-errors'

class ProjectController {
    private projectUseCase: ProjectUseCase;
    constructor(projectUseCase: ProjectUseCase) {
        this.projectUseCase = projectUseCase;
    }

    test(req: Request, res: Response, next: NextFunction) {
        try {
            throw createError(404,'just a error')
        } catch (error) {
            next(error)
        }
    }

    async createProject(req: Request, res: Response) {
        try {
        } catch (error) {
            console.log(error);
        }
    }
}

export default ProjectController;


