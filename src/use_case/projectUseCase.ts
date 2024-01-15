import { NextFunction } from "express";
import { IProjects } from "../infrastructure/database/project";
import ProjectRepository from "../infrastructure/repository/projectRepository";
import createError from 'http-errors'
import { ProjectProgress, projectEdit } from "../domain/project";

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

    async editProject(projectId: string, data: projectEdit) {
        try {
            const response = await this.projectRepository.editProject(projectId, data)
            
            if (response) return { success: true, message: 'Project details updated successfully', project: response }
            else throw createError(500, 'Project details updating failed')
        } catch (error) {
            throw error
        }
    }

    async addProgress(data: ProjectProgress, projectId: string) {
        try {
            const response = await this.projectRepository.addProgress(data, projectId)
            if(response) return { success: true, message: 'Project progress added successfully', project: response}
            else throw createError(400, 'Project progress posting failed')
        } catch (error) {
            throw error
        }
    }
}

export default ProjectUseCase
