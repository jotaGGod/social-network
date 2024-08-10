const FriendshipRepositoryImplementation = require("../repositories/implementation/friendshipRepositoryImplementation");
const TokenRepositoryImplementation = require("../repositories/implementation/tokenRepositoryImplementation");
const FriendshipRepository = require("../repositories/friendshipRepository");
const FriendshipService = require("../services/friendshipServices");
const FriendshipController = require("../controller/friendshipController");
const TokenService = require("../services/tokenService");
const TokenRepository = require("../repositories/tokenRepository");
const createFriendshipRoutes = require("../routes/friendshipRoutes");
const { IFriendshipRepository } = require('../repositories/interfaces/friendshipRepositoryAbstract');
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");

/**
 * Configures the friendship container.
 * @returns {object} The configured friendship routes.
 */
function configureFriendshipContainer() {
    // Instantiate the repository implementations
    const friendshipRepositoryImplementation = new FriendshipRepositoryImplementation();
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();

    // Create the repository instances
    const friendshipRepository = new FriendshipRepository(friendshipRepositoryImplementation, IFriendshipRepository);
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);

    // Create the service instances
    const tokenService = new TokenService(tokenRepository);
    const friendshipService = new FriendshipService(friendshipRepository);

    // Create the controller instance
    const friendshipController = new FriendshipController(friendshipService, tokenService);

    // Create the routes
    const friendshipRoutes = createFriendshipRoutes(friendshipController);

    return { friendshipRoutes };
}

module.exports = configureFriendshipContainer;
