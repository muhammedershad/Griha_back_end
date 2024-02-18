import { NextFunction } from "express";
import ProjectModel, { IProjects } from "../database/project";
import { ProjectProgress, projectEdit } from "../../domain/project";
import mongoose, { Types, Schema } from "mongoose";

class ProjectRepository {
    async createProject(data: IProjects) {
        try {
            const project = new ProjectModel({data, status: 'ongoing'});
            const response = project.save();
            // console.log(response, "repository");
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

    async userProject(userId: string) {
        try {
            const response = await ProjectModel.find({
                clients: userId,
            })
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
                            $sort: { date: -1 }, // Sort the array by date in descending order
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

    async allPorjects() {
        try {
            const response = await ProjectModel.find()
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

    // async projectProgress(projectId: string, progressId: string) {
    //     try {
    //         const result: IProjects | null = await ProjectModel.findOne({ _id: projectId });
    //         return result

    //     } catch (error) {
    //         throw error
    //     }
    // }

    async addComment(
        comment: string,
        projectId: string,
        progressId: string,
        userId: string
    ) {
        try {
            const project: IProjects | null = await ProjectModel.findById(
                projectId
            );

            if (!project) {
                throw new Error("Project not found");
            }
            // Find the progress object within the progress array based on progressId
            const progressObject = project?.progress.find(
                (progress) => progress._id.toString() === progressId
            );

            if (!progressObject) {
                throw new Error("Progress not found in the project");
            }

            // Add a new comment to the comments array of the progress object
            progressObject.comments.push({
                comment,
                user: new Types.ObjectId(userId), // Correct way to create a new ObjectId
                time: new Date(),
            });

            // Save the updated project
            await project.save();

            return project
        } catch (error) {
            throw error;
        }
    }
}

export default ProjectRepository;
