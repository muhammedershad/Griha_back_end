import { NextFunction } from "express";
import { IProjects } from "../infrastructure/database/project";
import ProjectRepository from "../infrastructure/repository/projectRepository";

class ProjectUseCase {
    private projectRepository: ProjectRepository
    constructor( projectRepository: ProjectRepository ) {
        this.projectRepository = projectRepository
    }

    async createProject (data: IProjects) {
        try {
            const response = await this.projectRepository.createProject(data)
            if (response) {
                return { success: true, message: 'Project created successfully'}
            } else throw createError(400, 'Project creation failed')
        } catch (error) {
            throw error
        }
    }
}

export default ProjectUseCase

function createError(arg0: number, arg1: string) {
    throw new Error("Function not implemented.");
}
