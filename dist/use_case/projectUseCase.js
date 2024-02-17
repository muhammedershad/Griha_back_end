"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
class ProjectUseCase {
    constructor(projectRepository, featuredProjectRepository) {
        this.projectRepository = projectRepository;
        this.featuredProjectRepository = featuredProjectRepository;
    }
    async createProject(data) {
        try {
            const response = await this.projectRepository.createProject(data);
            if (response) {
                return { success: true, message: 'Project created successfully' };
            }
            else
                throw (0, http_errors_1.default)(400, 'Project creation failed');
        }
        catch (error) {
            throw error;
        }
    }
    async employeeProject(employeeId) {
        try {
            const response = await this.projectRepository.employeeProject(employeeId);
            if (response)
                return { success: true, message: 'Employee projects fetched successfully', projects: response };
            else
                throw (0, http_errors_1.default)(400, 'Error in fetching employee projects');
        }
        catch (error) {
            throw error;
        }
    }
    async projectDetails(projectId) {
        try {
            const response = await this.projectRepository.projectDetails(projectId);
            if (response)
                return { success: true, message: 'Project details fetched successfully', project: response };
            else
                throw (0, http_errors_1.default)(400, 'Project not found in the repository');
        }
        catch (error) {
            throw error;
        }
    }
    async editProject(projectId, data) {
        try {
            const response = await this.projectRepository.editProject(projectId, data);
            if (response)
                return { success: true, message: 'Project details updated successfully', project: response };
            else
                throw (0, http_errors_1.default)(500, 'Project details updating failed');
        }
        catch (error) {
            throw error;
        }
    }
    async addProgress(data, projectId) {
        try {
            const response = await this.projectRepository.addProgress(data, projectId);
            if (response)
                return { success: true, message: 'Project progress added successfully', project: response };
            else
                throw (0, http_errors_1.default)(400, 'Project progress posting failed');
        }
        catch (error) {
            throw error;
        }
    }
    async userProject(userId) {
        try {
            const response = await this.projectRepository.userProject(userId);
            if (response)
                return { success: true, message: 'User projects fetched successfully', projects: response };
            else
                throw (0, http_errors_1.default)(400, 'Error in fetching User projects');
        }
        catch (error) {
            throw error;
        }
    }
    async allPorjects() {
        try {
            const response = await this.projectRepository.allPorjects();
            if (response)
                return { success: true, messge: 'All project data fetched', allProjects: response };
            else
                throw (0, http_errors_1.default)(500, 'Failed all project data fetching');
        }
        catch (error) {
            throw error;
        }
    }
    async addFeaturedProject(data) {
        try {
            const response = await this.featuredProjectRepository.addFeaturedProject(data);
            if (response)
                return { success: true, message: 'Featured project added successfully' };
            else
                throw (0, http_errors_1.default)(500, 'Faild in adding new featured project');
        }
        catch (error) {
            throw error;
        }
    }
    async updateFeaturedProject(data) {
        try {
            const response = await this.featuredProjectRepository.updateFeaturedProject(data);
            if (response)
                return { success: true, message: 'Featured project updated successfully', project: response };
            else
                throw (0, http_errors_1.default)(500, 'Faild in updating featured project');
        }
        catch (error) {
            throw error;
        }
    }
    async allFeaturedProjects(category, search, page) {
        try {
            console.log("here usecase start");
            const response = await this.featuredProjectRepository.allFeaturedProjects(category, search, page);
            if (response.response)
                return { success: true, message: 'All featured project data fetching successful', allFeaturedProjects: response.response, totalPages: (Math.ceil(response.totalItems / 12)) };
            else
                throw (0, http_errors_1.default)(500, 'Faild to fetch all featured projects');
        }
        catch (error) {
            throw error;
        }
    }
    async featuredPorjectDetails(projectId) {
        try {
            const response = await this.featuredProjectRepository.featuredPorjectDetails(projectId);
            if (response)
                return { success: true, message: 'Featured project details fetched successfully', projectDetails: response };
            else
                throw (0, http_errors_1.default)(500, 'Not possible to find a project with this project id');
        }
        catch (error) {
            throw error;
        }
    }
    // async projectProgress(projectId: string, progressId: string) {
    //     try {
    //         const response = await this.projectRepository.projectProgress(projectId, progressId)
    //         if(response) {
    //             return { success: true, message: 'Project pogress data fetching successful', project: response}
    //         } 
    //         else throw createError(500, 'Not possible to fetch the project progress details')
    //     } catch (error) {
    //         throw error
    //     }
    // }
    async addComment(comment, projectId, progressId, userId) {
        try {
            const response = await this.projectRepository.addComment(comment, projectId, progressId, userId);
            if (response)
                return { success: true, message: 'Comment added successfully', project: response };
            else
                throw (0, http_errors_1.default)(500, 'Error in posting comment');
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = ProjectUseCase;
