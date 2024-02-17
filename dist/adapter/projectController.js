"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
class ProjectController {
    constructor(projectUseCase) {
        this.projectUseCase = projectUseCase;
    }
    test(req, res, next) {
        try {
            // throw createError(403,'just a error')
            return res.status(200).json({ success: true });
        }
        catch (error) {
            next(error);
        }
    }
    async createProject(req, res, next) {
        try {
            let { projectName, postedBy, clients, details, location, team, address } = req.body;
            if (!projectName.trim())
                throw (0, http_errors_1.default)(400, 'Enter valid project name');
            if (!postedBy.trim())
                throw (0, http_errors_1.default)(400, 'Project creator details not avilable');
            if (!details.trim())
                throw (0, http_errors_1.default)(400, 'Enter the details');
            if (!location.trim())
                throw (0, http_errors_1.default)(400, 'Enter valid locatoin');
            if (!(address === null || address === void 0 ? void 0 : address.address.trim()))
                throw (0, http_errors_1.default)(400, 'Enter valid address');
            if (!address.district.trim())
                throw (0, http_errors_1.default)(400, 'Enter valid district');
            if (!address.state.trim())
                throw (0, http_errors_1.default)(400, 'Enter valid state');
            if (!address.pincode.trim())
                throw (0, http_errors_1.default)(400, 'Enter valid pin code');
            const response = await this.projectUseCase.createProject(req.body);
            if (response) {
                return res.status(200).json(response);
            }
        }
        catch (error) {
            next(error);
        }
    }
    async employeeProject(req, res, next) {
        try {
            const employeeId = req.params.employeeId;
            if (!employeeId)
                throw (0, http_errors_1.default)(400, 'Employee id is missing');
            const response = await this.projectUseCase.employeeProject(employeeId);
            if (response)
                return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async userProject(req, res, next) {
        try {
            const userId = req.params.userId;
            if (!userId)
                throw (0, http_errors_1.default)(400, 'User id is missing');
            const response = await this.projectUseCase.userProject(userId);
            if (response)
                return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async projectDetails(req, res, next) {
        try {
            const projectId = req.params.projectId;
            if (!projectId)
                throw (0, http_errors_1.default)(400, 'Project id is missing');
            const response = await this.projectUseCase.projectDetails(projectId);
            if (response)
                res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async updateProject(req, res, next) {
        try {
            const projectId = req.params.projectId;
            let { projectName, address, location, teamLead, teamMembers, clients } = req.body;
            if (!projectName.trim())
                throw (0, http_errors_1.default)(400, 'Enter valid project name');
            if (!address.address.trim())
                throw (0, http_errors_1.default)(400, 'Enter valid address');
            if (!address.district.trim())
                throw (0, http_errors_1.default)(400, 'Enter valid distric');
            if (!address.state.trim())
                throw (0, http_errors_1.default)(400, 'Enter valid state');
            if (!address.pincode.trim())
                throw (0, http_errors_1.default)(400, 'Enter vaild pincode');
            if (!location.trim())
                throw (0, http_errors_1.default)(400, 'Enter valid details');
            if (!projectId.trim())
                throw (0, http_errors_1.default)(400, 'Invalid project id');
            if (!teamLead.trim())
                throw (0, http_errors_1.default)(400, 'Select the team lead');
            const response = await this.projectUseCase.editProject(projectId, req.body);
            if (response)
                return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async addProgress(req, res, next) {
        try {
            let { title, shortDiscription, details, imageUrls, videoUrls, otherFileUrls, postedBy } = req.body;
            let projectId = req.params.projectId;
            console.log(req.body, req.params);
            if (!title.trim())
                throw (0, http_errors_1.default)(400, 'Enter valid task name');
            if (!shortDiscription.trim())
                throw (0, http_errors_1.default)(400, 'Enter valid short description about the progress');
            if (!details.trim())
                throw (0, http_errors_1.default)(400, 'Enter details');
            if (!postedBy.trim())
                throw (0, http_errors_1.default)(400, 'Employee id is missing');
            if (!projectId.trim())
                throw (0, http_errors_1.default)(400, 'Project id is missing');
            const response = await this.projectUseCase.addProgress(req.body, projectId);
            if (response.success)
                return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async allPorjects(req, res, next) {
        try {
            console.log('here');
            const response = await this.projectUseCase.allPorjects();
            if (response.success)
                return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async addFeaturedProject(req, res, next) {
        try {
            console.log('here');
            let { projectName, cilent, siteArea, location, builtupArea, youtubeLink, category, details, images } = req.body;
            const response = await this.projectUseCase.addFeaturedProject(req.body);
            if (response)
                return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async updateFeaturedProject(req, res, next) {
        try {
            let { projectName, cilent, siteArea, location, builtupArea, youtubeLink, category, details, images, _id } = req.body;
            const response = await this.projectUseCase.updateFeaturedProject(req.body);
            if (response)
                return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async allFeaturedProjects(req, res, next) {
        try {
            console.log("here controller");
            const category = req.params.category.trim();
            const search = req.query.search ? req.query.search.toString() : '';
            const page = parseInt(req.query.page) || 1;
            const response = await this.projectUseCase.allFeaturedProjects(category, search, page);
            if (response)
                return res.status(200).json(response);
        }
        catch (error) {
            console.log('error');
            // next(error)
        }
    }
    async featuredPorjectDetails(req, res, next) {
        try {
            const projectId = req.params.projectId;
            if (!projectId)
                throw (0, http_errors_1.default)(400, 'Invalid Project Id');
            const response = await this.projectUseCase.featuredPorjectDetails(projectId);
            if (response)
                return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    // async projectProgress(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const projectId = req.params.projectId
    //         const progressId = req.params.progressId            
    //         if(!projectId) throw createError(400, 'Invalid Project Id')
    //         if(!progressId) throw createError(400, 'Invalid Progress Id')
    //         const response = await this.projectUseCase.projectProgress(projectId, progressId)
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    async addComment(req, res, next) {
        try {
            let { comment, projectId, progressId, userId } = req.body;
            if (!comment.trim())
                throw (0, http_errors_1.default)(400, 'Invalid commment');
            if (!projectId.trim())
                throw (0, http_errors_1.default)(400, 'Invalid project id');
            if (!progressId.trim())
                throw (0, http_errors_1.default)(400, 'Invalid progress id');
            if (!userId.trim())
                throw (0, http_errors_1.default)(400, 'Invalid user id');
            const response = await this.projectUseCase.addComment(comment, projectId, progressId, userId);
            if (response)
                return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = ProjectController;
