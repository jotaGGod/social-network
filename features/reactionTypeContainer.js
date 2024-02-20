const ReactionTypeRepositoryImplementation = require("../repositories/mySql/reactionTypeRepositoryImplementation");
const ReactionTypeRepository = require("../repositories/reactionTypeRepository");
const ReactionTypeService = require("../services/reactionTypeService");
const ReactionTypeController = require("../controller/reactionTypeController");
const createReactionTypeRoutes = require("../routes/reactionTypeRoutes");

function configureReactionTypeContainer() {
    const reactionTypeRepositoryImplementation = new ReactionTypeRepositoryImplementation();
    const reactionTypeRepository = new ReactionTypeRepository(reactionTypeRepositoryImplementation);
    const reactionTypeService = new ReactionTypeService(reactionTypeRepository);
    const reactionTypeController = new ReactionTypeController(reactionTypeService);
    const reactionTypeRoutes = createReactionTypeRoutes(reactionTypeController);
    return { reactionTypeRoutes }
}

module.exports = configureReactionTypeContainer;
