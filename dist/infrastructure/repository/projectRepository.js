"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = __importDefault(require("../database/project"));
const mongoose_1 = require("mongoose");
class ProjectRepository {
    async createProject(data) {
        try {
            const project = new project_1.default(data);
            const response = project.save();
            // console.log(response, "repository");
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async employeeProject(employeeId) {
        try {
            const response = await project_1.default.find({
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
        }
        catch (error) {
            throw error;
        }
    }
    async userProject(userId) {
        try {
            const response = await project_1.default.find({
                clients: userId,
            })
                .populate("postedBy") // Populate postedBy with specific fields
                .populate("team.members") // Populate team members with specific fields
                .populate("team.teamLead") // Populate team lead with specific fields
                .populate("clients") // Populate team lead with specific fields
                .populate("progress.postedBy") // Populate submittedBy with specific fields
                .exec();
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async projectDetails(projectId) {
        try {
            const response = await project_1.default.findById(projectId)
                .populate("postedBy") // Populate postedBy with specific fields
                .populate("team.members") // Populate team members with specific fields
                .populate("team.teamLead") // Populate team lead with specific fields
                .populate("clients") // Populate team lead with specific fields
                .populate("progress.postedBy") // Populate submittedBy with specific fields
                .exec();
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async editProject(projectId, data) {
        var _a, _b, _c, _d;
        try {
            const response = await project_1.default.findByIdAndUpdate(projectId, {
                $set: {
                    projectName: data === null || data === void 0 ? void 0 : data.projectName,
                    "address.address": (_a = data === null || data === void 0 ? void 0 : data.address) === null || _a === void 0 ? void 0 : _a.address,
                    "address.district": (_b = data === null || data === void 0 ? void 0 : data.address) === null || _b === void 0 ? void 0 : _b.district,
                    "address.state": (_c = data === null || data === void 0 ? void 0 : data.address) === null || _c === void 0 ? void 0 : _c.state,
                    "address.pincode": (_d = data === null || data === void 0 ? void 0 : data.address) === null || _d === void 0 ? void 0 : _d.pincode,
                    "team.teamLead": data === null || data === void 0 ? void 0 : data.teamLead,
                    "team.members": data === null || data === void 0 ? void 0 : data.teamMembers,
                    clients: data.clients,
                    location: data === null || data === void 0 ? void 0 : data.location,
                },
            }, { new: true } // This option returns the modified document
            )
                .populate("postedBy") // Populate postedBy with specific fields
                .populate("team.members") // Populate team members with specific fields
                .populate("team.teamLead") // Populate team lead with specific fields
                .populate("clients") // Populate team lead with specific fields
                .populate("progress.postedBy") // Populate submittedBy with specific fields
                .exec();
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async addProgress(data, projectId) {
        try {
            const response = await project_1.default.findByIdAndUpdate(projectId, {
                $push: {
                    progress: {
                        $each: [data],
                        $sort: { date: -1 }, // Sort the array by date in descending order
                    },
                },
            }, { new: true })
                .populate("postedBy")
                .populate("team.members")
                .populate("team.teamLead")
                .populate("clients")
                .populate("progress.postedBy")
                .exec();
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async allPorjects() {
        try {
            const response = await project_1.default.find()
                .populate("postedBy")
                .populate("team.members")
                .populate("team.teamLead")
                .populate("clients")
                .populate("progress.postedBy")
                .exec();
            return response;
        }
        catch (error) {
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
    async addComment(comment, projectId, progressId, userId) {
        try {
            const project = await project_1.default.findById(projectId);
            if (!project) {
                throw new Error("Project not found");
            }
            // Find the progress object within the progress array based on progressId
            const progressObject = project === null || project === void 0 ? void 0 : project.progress.find((progress) => progress._id.toString() === progressId);
            if (!progressObject) {
                throw new Error("Progress not found in the project");
            }
            // Add a new comment to the comments array of the progress object
            progressObject.comments.push({
                comment,
                user: new mongoose_1.Types.ObjectId(userId), // Correct way to create a new ObjectId
                time: new Date(),
            });
            // Save the updated project
            await project.save();
            return project;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = ProjectRepository;
