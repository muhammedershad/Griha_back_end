import { response } from "express";
import FeaturedProject, {
    IFeaturedProject,
} from "../database/featuredProjects";
import { ParsedQs } from "qs";
import mongoose from "mongoose";

class FeaturedProjectRepository {
    async addFeaturedProject(data: IFeaturedProject) {
        try {
            const project = new FeaturedProject(data);
            const response = project.save();
            console.log(response, "repository");
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateFeaturedProject(data: IFeaturedProject) {
        try {
            const response = await FeaturedProject.findByIdAndUpdate(
                data._id,
                data,
                { overwrite: true }
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async allFeaturedProjects(category: string, search: string, page: number) {
        try {
            console.log("here repository")
            let response;
            let totalItems;
            if (category === "all") {
                const regex = new RegExp(search, "i");
                response = await FeaturedProject.find({
                    projectName: { $regex: regex },
                })
                    .skip((page - 1) * 12)
                    .limit(12);

                totalItems = await FeaturedProject.countDocuments({
                    projectName: { $regex: regex },
                });
            } else {
                const regex = new RegExp(search, "i");
                response = await FeaturedProject.find({
                    category,
                    projectName: { $regex: regex },
                });
                totalItems = await FeaturedProject.countDocuments({
                    category,
                    projectName: { $regex: regex },
                });
            }
            console.log(response, totalItems)
            return { response, totalItems };
        } catch (error) {
            throw error;
        }
    }

    async featuredPorjectDetails(projectId: string) {
        try {
            const newid = new mongoose.Types.ObjectId(projectId)
            const response = await FeaturedProject.findById(newid);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default FeaturedProjectRepository;
