import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IFeaturedProject extends Document {
    _id: ObjectId;
    projectName: string;
    client: string;
    details: string;
    location: string;
    siteArea: string;
    builtupArea: string;
    youtubeLink: string;
    images: string[];
}

const FeaturedProjectSchema: Schema = new Schema({
    projectName: { type: String, required: true },
    location: { type: String, required: true },
    client: {type: String, required: true},
    details: { type: String, required: true },
    siteArea: { type: String, required: true },
    builtupArea: { type: String, required: true },
    youtubeLink: { type: String },
    images: [{type: String}]
});

const FeaturedProject = mongoose.model<IFeaturedProject>("Projects", FeaturedProjectSchema);

export default FeaturedProject;