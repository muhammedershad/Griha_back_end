"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = __importDefault(require("../database/tasks"));
class TasksRepository {
    async createTask(data) {
        try {
            const task = new tasks_1.default(data);
            const response = await task.save();
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllTasksByProject(projectId) {
        try {
            const response = await tasks_1.default.find({ project: projectId });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async employeeAllTasks(employeeId) {
        try {
            const response = await tasks_1.default.find({
                $or: [{ assignedTo: employeeId }, { assignedBy: employeeId }],
            }).populate("project", "projectName");
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async taskDetials(taskId) {
        try {
            const response = await tasks_1.default.findById(taskId)
                .populate("assignedBy")
                .populate("assignedTo")
                .populate("project")
                .populate("comments.user");
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async addResponse(taskId, data) {
        try {
            const response = await tasks_1.default.findByIdAndUpdate(taskId, {
                $push: { response: data },
                $set: {
                    status: "needToReview",
                },
            }, { new: true })
                .populate("assignedBy")
                .populate("assignedTo")
                .populate("project")
                .populate("response.user")
                .populate("comments.user");
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async addComment(taskId, data) {
        try {
            const response = await tasks_1.default.findByIdAndUpdate(taskId, { $push: { comments: data } }, { new: true })
                .populate("assignedBy")
                .populate("assignedTo")
                .populate("project")
                .populate("response.user")
                .populate("comments.user");
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = TasksRepository;
