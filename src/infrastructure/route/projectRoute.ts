import express from "express";
import ProjectController from "../../adapter/projectController";
import ProjectUseCase from "../../use_case/projectUseCase";
import ProjectRepository from "../repository/projectRepository";
import adminAuthMiddleware from "../middleware/adminAuthMiddelware";
import FeaturedProjectRepository from "../repository/FeaturedProjectsRepository";

const repository = new ProjectRepository()
const featuredProjectRepository = new FeaturedProjectRepository()
const use_case = new ProjectUseCase( repository, featuredProjectRepository )
const controller = new ProjectController( use_case )

const router = express.Router()

router.get('/', (req, res, next) => controller.test (req, res, next))
router.post('/', (req, res, next) => controller.createProject(req, res, next))
router.get('/employee-project/:employeeId', (req, res, next) => controller.employeeProject(req, res, next))
router.get('/user-project/:userId', (req, res, next) => controller.userProject(req, res, next))
router.get('/project-details/:projectId', (req, res, next) => controller.projectDetails(req, res, next))
router.patch('/:projectId', (req, res, next) => controller.updateProject(req, res, next))
router.post('/post-progress/:projectId', (req, res, next) => controller.addProgress(req, res, next))
router.get('/all-projects', adminAuthMiddleware, (req, res, next) => controller.allPorjects(req, res, next))

// featued projects
router.post('/featured-projects', (req, res, next) => controller.addFeaturedProject(req, res, next))
router.put('/featured-projects', (req, res, next) => controller.updateFeaturedProject(req, res, next))
router.get('/featured-projects/:category', (req, res, next) => controller.allFeaturedProjects(req, res, next))
router.get('/featured-project-details/:projectId', (req, res, next) => controller.featuredPorjectDetails(req, res, next))

export default router