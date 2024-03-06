const TargetPublicRepositoryImplementation = require("../repositories/mySql/targetPublicRepositoryImplementation");
const TargetPublicRepository = require("../repositories/mySql/targetPublicRepositoryImplementation");
const TargetPublicService = require("../services/targetPublicService");
const TargetPublicController = require("../controller/targetPublicController");
const createTargetPublicRoutes = require("../routes/targetPublicRoutes");
const { ITargetPublicRepository } = require("../repositories/Interfaces/targetPublicRepositoryAbstract");

function configureTargetPublicContainer(){
    const targetPublicRepositoryImplementation = new TargetPublicRepositoryImplementation();
    const targetPublicRepository = new TargetPublicRepository(targetPublicRepositoryImplementation, contract=ITargetPublicRepository);
    const targetPublicService = new TargetPublicService(targetPublicRepository);
    const targetPublicController = new TargetPublicController(targetPublicService);
    const targetPublicRoutes = createTargetPublicRoutes(targetPublicController);
    return { targetPublicRoutes }
}

module.exports = configureTargetPublicContainer;
