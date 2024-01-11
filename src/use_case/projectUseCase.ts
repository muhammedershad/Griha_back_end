import ProjectRepository from "../infrastructure/repository/projectRepository";

class ProjectUseCase {
    private projectRepository: ProjectRepository
    constructor( projectRepository: ProjectRepository ) {
        this.projectRepository = projectRepository
    }
}

export default ProjectUseCase