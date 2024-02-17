"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
class TasksController {
    constructor(tasksUsecase) {
        this.tasksUsecase = tasksUsecase;
    }
    async test(req, res, next) {
        try {
            res.status(200).json({ success: true });
        }
        catch (error) {
            next(error);
        }
    }
    async createTask(req, res, next) {
        try {
            let { taskName, shortDescription, details, assignedBy, dueDate, department, assignedTo, project, attachments } = req.body;
            console.log(req.body);
            if (!taskName.trim())
                throw (0, http_errors_1.default)(400, 'Invalid task name');
            if (!shortDescription.trim())
                throw (0, http_errors_1.default)(400, 'invalid short description');
            if (!details.trim())
                throw (0, http_errors_1.default)(400, 'Invalid details');
            if (!assignedBy.trim())
                throw (0, http_errors_1.default)(400, 'Invalid assigned person id');
            if (!dueDate.trim())
                throw (0, http_errors_1.default)(400, 'Invalid due date');
            if (!department.trim())
                throw (0, http_errors_1.default)(400, 'Invalid department');
            if (!assignedTo.trim())
                throw (0, http_errors_1.default)(400, 'Invalid assigned to person id');
            if (!project.trim())
                throw (0, http_errors_1.default)(400, 'Invalid project id');
            const response = await this.tasksUsecase.createTask(req.body);
            if (response.success)
                return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async getAllTasksByProject(req, res, next) {
        try {
            const proejctId = req.params.projectId;
            if (!proejctId.trim())
                throw (0, http_errors_1.default)(400, 'Invalid projectId');
            const response = await this.tasksUsecase.getAllTasksByProject(proejctId);
            if (response === null || response === void 0 ? void 0 : response.success)
                return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async employeeAllTasks(req, res, next) {
        try {
            const employeeId = req.params.employeeId;
            if (!employeeId)
                throw (0, http_errors_1.default)(400, 'Invalid employee id');
            const response = await this.tasksUsecase.employeeAllTasks(employeeId);
            return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async taskDetials(req, res, next) {
        try {
            const taskId = req.params.taskId;
            if (!taskId)
                throw (0, http_errors_1.default)(400, 'Invalid task Id');
            const response = await this.tasksUsecase.taskDetials(taskId);
            return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async addResponse(req, res, next) {
        try {
            let { taskId, details, user, attachments } = req.body;
            console.log(req.body);
            req.body.taskId = null;
            if (!taskId.trim())
                throw (0, http_errors_1.default)(400, 'Invalid task id');
            if (!details.trim())
                throw (0, http_errors_1.default)(400, 'Invalid details');
            if (!user.trim())
                throw (0, http_errors_1.default)(400, 'Invalid user id');
            const response = await this.tasksUsecase.addResponse(taskId, req.body);
            return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async addComment(req, res, next) {
        try {
            const { comment, user, taskId } = req.body;
            if (!comment.trim())
                throw (0, http_errors_1.default)(400, 'Invalid comment');
            if (!user.trim())
                throw (0, http_errors_1.default)(400, 'Invalid user id');
            if (!taskId.trim())
                throw (0, http_errors_1.default)(400, 'Invalid taks id');
            const response = await this.tasksUsecase.addComment(taskId, req.body);
            return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = TasksController;
