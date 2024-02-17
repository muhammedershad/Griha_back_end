"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const featuredProjects_1 = __importDefault(require("../database/featuredProjects"));
const mongoose_1 = __importDefault(require("mongoose"));
class FeaturedProjectRepository {
    async addFeaturedProject(data) {
        try {
            const project = new featuredProjects_1.default(data);
            const response = project.save();
            console.log(response, "repository");
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async updateFeaturedProject(data) {
        try {
            const response = await featuredProjects_1.default.findByIdAndUpdate(data._id, data, { overwrite: true });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async allFeaturedProjects(category, search, page) {
        try {
            console.log("here repository");
            let response;
            let totalItems;
            if (category === "all") {
                const regex = new RegExp(search, "i");
                response = await featuredProjects_1.default.find({
                    projectName: { $regex: regex },
                })
                    .skip((page - 1) * 12)
                    .limit(12);
                totalItems = await featuredProjects_1.default.countDocuments({
                    projectName: { $regex: regex },
                });
            }
            else {
                const regex = new RegExp(search, "i");
                response = await featuredProjects_1.default.find({
                    category,
                    projectName: { $regex: regex },
                });
                totalItems = await featuredProjects_1.default.countDocuments({
                    category,
                    projectName: { $regex: regex },
                });
            }
            console.log(response, totalItems);
            return { response, totalItems };
        }
        catch (error) {
            throw error;
        }
    }
    async featuredPorjectDetails(projectId) {
        try {
            const newid = new mongoose_1.default.Types.ObjectId(projectId);
            const response = await featuredProjects_1.default.findById(newid);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = FeaturedProjectRepository;
