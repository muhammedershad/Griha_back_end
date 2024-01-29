import { response } from "express";
import FeaturedProject, {
    IFeaturedProject,
} from "../database/featuredProjects";
import { ParsedQs } from "qs";

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
            return { response, totalItems };
        } catch (error) {
            throw error;
        }
    }

    async featuredPorjectDetails(projectId: string) {
        try {
            const response = await FeaturedProject.findById(projectId);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default FeaturedProjectRepository;
