import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IProjects extends Document {
    _id: ObjectId;
    projectName: string;
    postedBy: ObjectId;
    clients: ObjectId[] | null;
    details: string;
    time: Date;
    location: string;
    team: {
        members: ObjectId[] | null;
        teamLead: ObjectId;
    }
    address: {
        address: string;
        district: string;
        state: string;
        pincode: string;
    };
    progress: {
        _id: ObjectId | null;
        attachments: string[] | null;
        date: Date | null;
        details: string | null
        shortDiscription: string | null
        submittedBy: ObjectId | null
        title: string | null
        comments: {
            comment: string | null
            user: ObjectId | null
            time: Date | null
        }[] | null;
    };
}

const ProjectsSchema: Schema = new Schema({
    projectName: { type: String, required: true },
    location: { type: String },
    details: { type: String, required: true },
    clients: [{ type: Schema.Types.ObjectId }],
    postedBy: { type: Schema.Types.ObjectId, required: true, ref: 'Employees' },
    time: { type: Date, required: true, default: new Date() },
    team: {
        members: [{ type: Schema.Types.ObjectId }],
        teamLead: { type: Schema.Types.ObjectId, required: true },
    },
    address: {
        address: { type: String, required: true },
        district: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
    },
    progress: {
        title: { type: String },
        date: { type: Date, default: new Date() },
        shortDiscription: { type: String },
        details: { type: String },
        submittedBy: { type: Schema.Types.ObjectId },
        attachments: [{ type: String }],
        comments: [
            {
                comment: { type: String },
                user: { type: Schema.Types.ObjectId },
                time: { type: Date, default: new Date() }
            },
        ],
    },
});

const ProjectModel = mongoose.model<IProjects>("Projects", ProjectsSchema);

export default ProjectModel;
