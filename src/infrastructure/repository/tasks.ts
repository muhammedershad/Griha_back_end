import Tasks, { ITasks } from "../database/tasks";

class TasksRepository {
    async createTask(data: ITasks) {
        try {
            const task = new Tasks(data);
            const response = await task.save();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getAllTasksByProject(projectId: string) {
        try {
            const response = await Tasks.find({ project: projectId });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async employeeAllTasks(employeeId: string) {
        try {
            const response = await Tasks.find({
                $or: [{ assignedTo: employeeId }, { assignedBy: employeeId }],
            }).populate("project", "projectName");
            return response;
        } catch (error) {
            throw error;
        }
    }

    async taskDetials(taskId: string) {
        try {
            const response = await Tasks.findById(taskId)
                .populate("assignedBy")
                .populate("assignedTo")
                .populate("project");
            return response
        } catch (error) {
            throw error;
        }
    }
}

export default TasksRepository;
