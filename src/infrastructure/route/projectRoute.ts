import express from "express";
import ProjectController from "../../adapter/projectController";
import ProjectUseCase from "../../use_case/projectUseCase";
import ProjectRepository from "../repository/projectRepository";

const repository = new ProjectRepository()
const use_case = new ProjectUseCase( repository )
const controller = new ProjectController( use_case )

const router = express.Router()

router.get('/', (req, res, next) => controller.test (req, res, next))
router.post('/', (req, res) => controller.createProject(req, res))

export default router