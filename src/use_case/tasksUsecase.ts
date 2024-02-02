import { ITasks } from "../infrastructure/database/tasks";
import TasksRepository from "../infrastructure/repository/tasks";
import createError from 'http-errors'

class TasksUsecase {
    private tasksRepository: TasksRepository;
    constructor(tasksRepository: TasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async createTask( data: ITasks ) {
        try {
            const response = await this.tasksRepository.createTask(data)
            if(response) return { success: true, message: 'Task created successfully', task: response }
            else throw createError(500, 'task creating failed')
             
        } catch (error) {
            throw error
        }
    }

    async getAllTasksByProject(projectId: string) {
        try {
            const response = await this.tasksRepository.getAllTasksByProject(projectId)
            if(response) return { success: true, message: 'All tasks data fetched', tasks: response}
        } catch (error) {
            throw error
        }
    }
    
}

export default TasksUsecase