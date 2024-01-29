import { NextFunction } from "express";
import { IProjects } from "../infrastructure/database/project";
import ProjectRepository from "../infrastructure/repository/projectRepository";
import createError from 'http-errors'
import { ProjectProgress, projectEdit } from "../domain/project";
import FeaturedProjectRepository from "../infrastructure/repository/FeaturedProjectsRepository";
import { IFeaturedProject } from "../infrastructure/database/featuredProjects";
import { ParsedQs } from "qs";

class ProjectUseCase {
    private projectRepository: ProjectRepository
    private featuredProjectRepository: FeaturedProjectRepository
    constructor( projectRepository: ProjectRepository, featuredProjectRepository: FeaturedProjectRepository ) {
        this.projectRepository = projectRepository
        this.featuredProjectRepository = featuredProjectRepository
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

    async userProject(userId: string) {
        try {
            const response = await this.projectRepository.userProject(userId)
            if (response) return {success: true, message: 'User projects fetched successfully', projects: response}
            else throw createError(400, 'Error in fetching User projects')
        } catch (error) {
            throw error
        }
    }

    async allPorjects() {
        try {
            const response = await this.projectRepository.allPorjects()
            if (response) return { success: true, messge: 'All project data fetched', allProjects: response}
            else throw createError(500, 'Failed all project data fetching')
        } catch (error) {
            throw error
        }
    }

    async addFeaturedProject(data: IFeaturedProject) {
        try {
            const response = await this.featuredProjectRepository.addFeaturedProject(data)
            if(response) return { success: true, message: 'Featured project added successfully'}
            else throw createError(500, 'Faild in adding new featured project')
        } catch (error) {
            throw error
        }
    }

    async updateFeaturedProject(data: IFeaturedProject) {
        try {
            const response = await this.featuredProjectRepository.updateFeaturedProject(data)
            if(response) return { success: true, message: 'Featured project updated successfully', project: response}
            else throw createError(500, 'Faild in updating featured project')
        } catch (error) {
            throw error
        }
    }

    async allFeaturedProjects(category: string, search: string, page: number) {
        try {
            const response = await this.featuredProjectRepository.allFeaturedProjects(category, search, page)
            if(response.response) return { success: true, message: 'All featured project data fetching successful', allFeaturedProjects:response.response, totalPages: (Math.ceil(response.totalItems / 12) ) }
            else throw createError(500, 'Faild to fetch all featured projects')
        } catch (error) {
            throw error
        }
    }

    async featuredPorjectDetails(projectId: string) {
        try {
            const response = await this.featuredProjectRepository.featuredPorjectDetails(projectId)
            if(response) return { success: true, message: 'Featured project details fetched successfully', projectDetails: response }
            else throw createError(500, 'Not possible to find a project with this project id')
        } catch (error) {
            throw error
        }
    }
}

export default ProjectUseCase
