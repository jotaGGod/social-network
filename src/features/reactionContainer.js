const ReactionRepositoryImplementation = require("../repositories/implementation/reactionRepositoryImplementation");
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const ReactionRepository = require("../repositories/reactionRepository");
const ReactionService = require("../services/reactionService");
const ReactionController = require("../controller/reactionController");
const TokenRepository = require("../repositories/tokenRepository");
const TokenService = require("../services/tokenService");
const createReactionRoutes = require("../routes/reactionRoutes");
const { IReactionRepository } = require("../repositories/interfaces/reactionRepositoryAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

/**
 * Configures the Reaction container.
 * @returns {object} The configured reaction routes.
 */
function configureReactionContainer() {
    // Instantiate implementations
    const reactionRepositoryImplementation = new ReactionRepositoryImplementation();
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();

    // Create repository instances
    const reactionRepository = new ReactionRepository(reactionRepositoryImplementation, IReactionRepository);
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);

    // Create service instances
    const tokenService = new TokenService(tokenRepository);
    const reactionService = new ReactionService(reactionRepository);

    // Create controller instance
    const reactionController = new ReactionController(reactionService, tokenService);

    // Create routes
    const reactionRoutes = createReactionRoutes(reactionController);

    return { reactionRoutes };
}

module.exports = configureReactionContainer;
