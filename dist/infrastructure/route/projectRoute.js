"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = __importDefault(require("../../adapter/projectController"));
const projectUseCase_1 = __importDefault(require("../../use_case/projectUseCase"));
const projectRepository_1 = __importDefault(require("../repository/projectRepository"));
const FeaturedProjectsRepository_1 = __importDefault(require("../repository/FeaturedProjectsRepository"));
const repository = new projectRepository_1.default();
const featuredProjectRepository = new FeaturedProjectsRepository_1.default();
const use_case = new projectUseCase_1.default(repository, featuredProjectRepository);
const controller = new projectController_1.default(use_case);
const router = express_1.default.Router();
router.get('/', (req, res, next) => controller.test(req, res, next));
router.post('/', (req, res, next) => controller.createProject(req, res, next));
router.get('/employee-project/:employeeId', (req, res, next) => controller.employeeProject(req, res, next));
router.get('/user-project/:userId', (req, res, next) => controller.userProject(req, res, next));
router.get('/project-details/:projectId', (req, res, next) => controller.projectDetails(req, res, next));
router.patch('/:projectId', (req, res, next) => controller.updateProject(req, res, next));
// router.get('/:projectId/:progressId', (req, res, next) => controller.projectProgress(req, res, next))
router.post('/post-progress/:projectId', (req, res, next) => controller.addProgress(req, res, next));
router.get('/all-projects', (req, res, next) => controller.allPorjects(req, res, next));
router.post('/comment', (req, res, next) => controller.addComment(req, res, next));
// featued projects
router.post('/featured-projects', (req, res, next) => controller.addFeaturedProject(req, res, next));
router.put('/featured-projects', (req, res, next) => controller.updateFeaturedProject(req, res, next));
router.get('/featured-projects/:category', (req, res, next) => controller.allFeaturedProjects(req, res, next));
router.get('/featured-project-details/:projectId', (req, res, next) => controller.featuredPorjectDetails(req, res, next));
exports.default = router;
