const ReactionRepositoryImplementation = require("../repositories/mySql/reactionRepositoryImplementation")
const ReactionRepository = require("../repositories/reactionRepository");
const ReactionService = require("../services/reactionService");
const ReactionController = require("../controller/reactionController");
const createReactionRoutes = require("../routes/reactionRoutes");

function configureReactionContainer() {
    const reactionRepositoryImplementation = new ReactionRepositoryImplementation();
    const reactionRepository = new ReactionRepository(reactionRepositoryImplementation);
    const reactionService = new ReactionService(reactionRepository);
    const reactionController = new ReactionController(reactionService);
    const reactionRoutes = createReactionRoutes(reactionController);
    return { reactionRoutes }
}

module.exports = configureReactionContainer;
