const ReactionTypeRepositoryImplementation = require("../repositories/implementation/reactionTypeRepositoryImplementation");
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const ReactionTypeRepository = require("../repositories/reactionTypeRepository");
const ReactionTypeService = require("../services/reactionTypeService");
const ReactionTypeController = require("../controller/reactionTypeController");
const TokenService = require("../services/tokenService");
const TokenRepository = require("../repositories/tokenRepository");
const createReactionTypeRoutes = require("../routes/reactionTypeRoutes");
const { IReactionTypeRepository } = require("../repositories/interfaces/reactionTypeRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

/**
 * Configures the ReactionType container.
 * @returns {object} The configured reaction type routes.
 */
function configureReactionTypeContainer() {
    // Instantiate implementations
    const reactionTypeRepositoryImplementation = new ReactionTypeRepositoryImplementation();
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();

    // Create repository instances
    const reactionTypeRepository = new ReactionTypeRepository(reactionTypeRepositoryImplementation, IReactionTypeRepository);
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);

    // Create service instances
    const tokenService = new TokenService(tokenRepository);
    const reactionTypeService = new ReactionTypeService(reactionTypeRepository);

    // Create controller instance
    const reactionTypeController = new ReactionTypeController(reactionTypeService, tokenService);

    // Create routes
    const reactionTypeRoutes = createReactionTypeRoutes(reactionTypeController);

    return { reactionTypeRoutes };
}

module.exports = configureReactionTypeContainer;
