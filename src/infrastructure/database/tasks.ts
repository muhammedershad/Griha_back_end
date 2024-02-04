import mongoose, { Schema, Document, ObjectId, Types } from "mongoose";

export interface ITasks extends Document {
    _id: ObjectId;
    taskName: String;
    shortDescription: String;
    assignedTo: ObjectId;
    status: String;
    dueDate: Date;
    assignedDate: Date;
    assignedBy: ObjectId;
    attachments: String[] | null;
    updateDate: Date;
    department: String;
    details: String;
    project: ObjectId;
    priority: String;
    comments:
        | {
              comment: string;
              user: Types.ObjectId;
              time: Date;
          }[];
}

const TasksSchema: Schema = new Schema({
    taskName: { type: String, required: true },
    shortDescription: { type: String, required: true },
    assignedTo: { type: Schema.Types.ObjectId, required: true, ref: 'Employees' },
    status: { type: String, required: true, default: "active" },
    dueDate: { type: Date, required: true },
    assignedDate: { type: Date, required: true, default: new Date() },
    assignedBy: { type: Schema.Types.ObjectId, required: true, ref: 'Employees' },
    attachments: [{ type: String }],
    updateDate: { type: Date, default: new Date() },
    department: { type: String, required: true },
    details: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, required: true, ref: 'Projects' },
    priority: { type: String, required: true },
    comments: [
        {
            comment: { type: String },
            user: {
                type: Schema.Types.ObjectId,
                ref: "Employees",
            },
            time: { type: Date, default: new Date() },
        },
    ],
});

const Tasks = mongoose.model<ITasks>("Tasks", TasksSchema);

export default Tasks;
