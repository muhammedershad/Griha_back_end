import { NextFunction } from "express";
import ProjectModel, { IProjects } from "../database/project";

class ProjectRepository {
    async createProject(data: IProjects) {
        try {
            const project = new ProjectModel(data);
            const response = project.save();
            console.log(response, "repository");
            return response;
        } catch (error) {
            throw error;
        }
    }

    async employeeProject(employeeId: string) {
        try {
            const response = await ProjectModel.find({
                $or: [
                    { "team.members": employeeId },
                    { postedBy: employeeId },
                    { "team.teamLead": employeeId },
                ],
            })
                .populate("postedBy", "name email") // Populate postedBy with specific fields
                .populate("team.members", "name email") // Populate team members with specific fields
                .populate("team.teamLead", "name email") // Populate team lead with specific fields
                .populate("progress.submittedBy", "name email") // Populate submittedBy with specific fields
                .exec();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async projectDetails(projectId: string) {
        try {
            const response = await ProjectModel.findById(projectId)
            return response
        } catch (error) {
            throw error;
        }
    }
}

export default ProjectRepository;
