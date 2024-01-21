import FeaturedProject, { IFeaturedProject } from "../database/featuredProjects";

class FeaturedProjectRepository {
    async addFeaturedProject(data: IFeaturedProject) {
        try {
            const project = new FeaturedProject(data);
            const response = project.save();
            console.log(response, "repository");
            return response;
        } catch (error) {
            throw error
        }
    }

    async allFeaturedProjects() {
        try {
            const response = await FeaturedProject.find()
            return response
        } catch (error) {
            throw error
        }
    }
}

export default FeaturedProjectRepository