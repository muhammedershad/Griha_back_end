import express from "express";
import TasksController from "../../adapter/tasksController";
import TasksUsecase from "../../use_case/tasksUsecase";
import TasksRepository from "../repository/tasks";

const repository = new TasksRepository()
const useCase = new TasksUsecase( repository )
const controller = new TasksController(useCase)

const router = express.Router()

router.get('/test', (req, res, next) => controller.test(req, res, next) );
router.post('/', (req, res, next) => controller.createTask(req, res, next))
router.get('/:projectId', (req, res, next) => controller.getAllTasksByProject(req, res, next))

export default router