import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IProjects extends Document {
    _id: ObjectId;
    projectName: string;
    postedBy: ObjectId;
    clients: ObjectId[];
    details: string;
    time: Date;
    location: string;
    team: {
        members: ObjectId[];
        teamLead: ObjectId;
    } | null;
    address: {
        address: string;
        district: string;
        state: string;
        pincode: string;
    } | null;
    progress: {
        _id: ObjectId | null;
        attachments: string[] | null;
        date: Date;
        details: string;
        shortDiscription: string;
        submittedBy: ObjectId;
        title: string;
        comments: {
            comment: string;
            user: ObjectId
            time: Date
        }[];
    };
}

const ProjectsSchema: Schema = new Schema({
    projectName: { type: String, required: true },
    location: { type: String },
    details: { type: String, required: true },
    clients: [{ type: Schema.Types.ObjectId }],
    postedBy: { type: Schema.Types.ObjectId, required: true },
    time: { type: Date, required: true },
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
        title: { type: String, required: true },
        date: { type: Date, required: true },
        shortDiscription: { type: String, required: true },
        details: { type: String, required: true },
        submittedBy: { type: Schema.Types.ObjectId, required: true },
        attachments: [{ type: String }],
        comments: [
            {
                comment: { type: String, required: true },
                user: { type: Schema.Types.ObjectId, required: true },
                time: { type: Date, required: true }
            },
        ],
    },
});

const ProjectModel = mongoose.model<IProjects>("Projects", ProjectsSchema);

export default ProjectModel;
