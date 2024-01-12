import { NextFunction } from "express";
import ProjectModel, { IProjects } from "../database/project";

class ProjectRepository {
    async createProject (data: IProjects) {
        try {
            const project = new ProjectModel(
                data
            )
            const response = project.save()
            console.log(response,'repository');
            return response
        } catch (error) {
            throw error
        }
    }
}

export default ProjectRepository;