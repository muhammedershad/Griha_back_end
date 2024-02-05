import { use } from "passport";
import { ITasks } from "../infrastructure/database/tasks";
import TasksRepository from "../infrastructure/repository/tasks";
import createError from 'http-errors'
import { Comment, Task_response } from "../domain/task";

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

    async employeeAllTasks( employeeId: string ) {
        try {
            const response = await this.tasksRepository.employeeAllTasks(employeeId)
            if(response) return { success: true, message: 'Employee all tasks fetched successfully', tasks: response}
            else throw createError(500, 'Failed to fetch employee all tasks')
        } catch (error) {
            throw error
        }
    }

    async taskDetials( taskId: string ) {
        try {
            const response = await this.tasksRepository.taskDetials( taskId )
            if(response) return { success: true, message: 'Task details fetched successfully', task:response }
            else throw createError(500, 'Failed to fetch task details')
        } catch (error) {
            throw error
        }
    }

    async addResponse( taskId: string, data: Task_response ) {
        try {
            const response = await this.tasksRepository.addResponse( taskId, data )
            if( response ) return { success: true, message: 'Response submitted', response: response}
            else throw createError(500, 'Failed to adding response')
        } catch (error) {
            throw error
        }
    } 

    async addComment(taskId: string, data: Comment) {
        try {
            const response = await this.tasksRepository.addComment( taskId, data )
            if(response) return { success: true, message: 'Comment added successfully', task: response }
            else throw createError(500, 'Failed to  add comment')
        } catch (error) {
            throw error
        }
    }
    
}

export default TasksUsecase