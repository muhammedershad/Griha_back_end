"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
class TasksUsecase {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async createTask(data) {
        try {
            const response = await this.tasksRepository.createTask(data);
            if (response)
                return { success: true, message: 'Task created successfully', task: response };
            else
                throw (0, http_errors_1.default)(500, 'task creating failed');
        }
        catch (error) {
            throw error;
        }
    }
    async getAllTasksByProject(projectId) {
        try {
            const response = await this.tasksRepository.getAllTasksByProject(projectId);
            if (response)
                return { success: true, message: 'All tasks data fetched', tasks: response };
        }
        catch (error) {
            throw error;
        }
    }
    async employeeAllTasks(employeeId) {
        try {
            const response = await this.tasksRepository.employeeAllTasks(employeeId);
            if (response)
                return { success: true, message: 'Employee all tasks fetched successfully', tasks: response };
            else
                throw (0, http_errors_1.default)(500, 'Failed to fetch employee all tasks');
        }
        catch (error) {
            throw error;
        }
    }
    async taskDetials(taskId) {
        try {
            const response = await this.tasksRepository.taskDetials(taskId);
            if (response)
                return { success: true, message: 'Task details fetched successfully', task: response };
            else
                throw (0, http_errors_1.default)(500, 'Failed to fetch task details');
        }
        catch (error) {
            throw error;
        }
    }
    async addResponse(taskId, data) {
        try {
            const response = await this.tasksRepository.addResponse(taskId, data);
            if (response)
                return { success: true, message: 'Response submitted', response: response };
            else
                throw (0, http_errors_1.default)(500, 'Failed to adding response');
        }
        catch (error) {
            throw error;
        }
    }
    async addComment(taskId, data) {
        try {
            const response = await this.tasksRepository.addComment(taskId, data);
            if (response)
                return { success: true, message: 'Comment added successfully', task: response };
            else
                throw (0, http_errors_1.default)(500, 'Failed to  add comment');
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = TasksUsecase;
