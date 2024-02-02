import Tasks, { ITasks } from "../database/tasks";

class TasksRepository {
    async createTask( data: ITasks ) {
        try {

            const task = new Tasks(data)
            const response = await task.save()
            return response

        } catch (error) {
            throw error
        }
    }

    async getAllTasksByProject( projectId: string ) {
        try {
            const response = await Tasks.find({ project: projectId })
            return response
        } catch (error) {
            throw error
        }
    }
}

export default TasksRepository;