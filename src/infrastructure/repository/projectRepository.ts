import { NextFunction } from "express";
import ProjectModel, { IProjects } from "../database/project";
import { ProjectProgress, projectEdit } from "../../domain/project";

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
                .populate("clients", "name email") // Populate team lead with specific fields
                .populate("progress.postedBy", "name email") // Populate submittedBy with specific fields
                .exec();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async projectDetails(projectId: string) {
        try {
            const response = await ProjectModel.findById(projectId)
                .populate("postedBy") // Populate postedBy with specific fields
                .populate("team.members") // Populate team members with specific fields
                .populate("team.teamLead") // Populate team lead with specific fields
                .populate("clients") // Populate team lead with specific fields
                .populate("progress.postedBy") // Populate submittedBy with specific fields
                .exec();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async editProject(projectId: string, data: projectEdit) {
        try {
            const response = await ProjectModel.findByIdAndUpdate(
                projectId,
                {
                    $set: {
                        projectName: data?.projectName,
                        "address.address": data?.address?.address,
                        "address.district": data?.address?.district,
                        "address.state": data?.address?.state,
                        "address.pincode": data?.address?.pincode,
                        "team.teamLead": data?.teamLead,
                        "team.members": data?.teamMembers,
                        clients: data.clients,
                        location: data?.location,
                    },
                },
                { new: true } // This option returns the modified document
            )
                .populate("postedBy") // Populate postedBy with specific fields
                .populate("team.members") // Populate team members with specific fields
                .populate("team.teamLead") // Populate team lead with specific fields
                .populate("clients") // Populate team lead with specific fields
                .populate("progress.postedBy") // Populate submittedBy with specific fields
                .exec();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async addProgress(data: ProjectProgress, projectId: string) {
        try {
            const response = await ProjectModel.findByIdAndUpdate(
                projectId,
                {
                    $push: {
                        progress: {
                            $each: [data],
                            $sort: { date: -1 }, // Assuming 'time' is the field you want to sort by
                        },
                    },
                },
                { new: true }
            )
                .populate("postedBy")
                .populate("team.members")
                .populate("team.teamLead")
                .populate("clients")
                .populate("progress.postedBy")
                .exec();

            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default ProjectRepository;
