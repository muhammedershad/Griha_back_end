import express from "express";
import ProjectController from "../../adapter/projectController";
import ProjectUseCase from "../../use_case/projectUseCase";
import ProjectRepository from "../repository/projectRepository";

const repository = new ProjectRepository()
const use_case = new ProjectUseCase( repository )
const controller = new ProjectController( use_case )

const router = express.Router()

router.get('/', (req, res, next) => controller.test (req, res, next))
router.post('/', (req, res, next) => controller.createProject(req, res, next))
router.get('/employee-project/:employeeId', (req, res, next) => controller.employeeProject(req, res, next))
router.get('/project-details/:projectId', (req, res, next) => controller.projectDetails(req, res, next))
router.patch('/:projectId', (req, res, next) => controller.updateProject(req, res, next))
router.post('/post-progress/:projectId', (req, res, next) => controller.addProgress(req, res, next))

export default router