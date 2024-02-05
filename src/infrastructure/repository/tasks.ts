import { Comment, Task_response } from "../../domain/task";
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
                .populate("project")
                .populate("comments.user");
            return response;
        } catch (error) {
            throw error;
        }
    }

    async addResponse(taskId: string, data: Task_response) {
        try {
            const response = await Tasks.findByIdAndUpdate(
                taskId,
                {
                    $push: { response: data },
                    $set: {
                        status: "needToReview",
                    },
                },
                { new: true }
            )
                .populate("assignedBy")
                .populate("assignedTo")
                .populate("project")
                .populate("response.user")
                .populate("comments.user");
            return response;
        } catch (error) {
            throw error;
        }
    }

    async addComment(taskId: string, data: Comment) {
        try {
            const response = await Tasks.findByIdAndUpdate(
                taskId,
                { $push: { comments: data } },
                { new: true }
            )
                .populate("assignedBy")
                .populate("assignedTo")
                .populate("project")
                .populate("response.user")
                .populate("comments.user");

            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default TasksRepository;
