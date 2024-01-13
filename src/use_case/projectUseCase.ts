import { NextFunction } from "express";
import { IProjects } from "../infrastructure/database/project";
import ProjectRepository from "../infrastructure/repository/projectRepository";
import createError from 'http-errors'

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

    async employeeProject(employeeId: string) {
        try {
            const response = await this.projectRepository.employeeProject(employeeId)
            if (response) return {success: true, message: 'Employee projects fetched successfully', projects: response}
            else throw createError(400, 'Error in fetching employee projects')
        } catch (error) {
            throw error
        }
    }

    async projectDetails(projectId: string) {
        try {
            const response = await this.projectRepository.projectDetails(projectId)
            if(response) return { success: true, message: 'Project details fetched successfully', project: response}
            else throw createError(400, 'Project not found in the repository')
        } catch (error) {
            throw error
        }
    }
}

export default ProjectUseCase
