const TokenRepositoryImplementation = require('../repositories/implementation/tokenRepositoryImplementation');
const FriendshipRequestRepositoryImplementation = require('../repositories/implementation/friendshipRequestRepository');
const FriendshipRequestRepository = require('../repositories/friendshipRequestRepository');
const TokenRepository = require('../repositories/tokenRepository');
const HashService = require('../services/cryptoService');
const TokenService = require('../services/tokenService');
const FriendshipRequestService = require('../services/friendshipRequestService');
const FriendshipRequestController = require("../controller/friendshipRequestController");
const createFriendshipRequestRoutes = require("../routes/friendshipRequestRoutes");
const FriendshipRepositoryImplementation = require("../repositories/implementation/friendshipRepositoryImplementation");
const { IFriendshipRequestRepository } = require("../repositories/interfaces/friendshipRequestAbstract");
const { ITokenRepository } = require("../repositories/interfaces/tokenRepositoryAbstract");
const FriendshipRepository = require("../repositories/friendshipRepository");
const { IFriendshipRepository } = require("../repositories/interfaces/friendshipRepositoryAbstract");
const FriendshipService = require("../services/friendshipServices");

/**
 * Configures the Friendship Request container.
 * @returns {object} The configured friendship request routes.
 */
function configureFriendshipRequestContainer() {
    // Instantiate the repository implementations
    const tokenRepositoryImplementation = new TokenRepositoryImplementation();
    const friendshipRequestRepositoryImplementation = new FriendshipRequestRepositoryImplementation();
    const friendshipRepositoryImplementation = new FriendshipRepositoryImplementation();

    // Create repository instances
    const tokenRepository = new TokenRepository(tokenRepositoryImplementation, ITokenRepository);
    const friendshipRequestRepository = new FriendshipRequestRepository(friendshipRequestRepositoryImplementation, IFriendshipRequestRepository);
    const friendshipRepository = new FriendshipRepository(friendshipRepositoryImplementation, IFriendshipRepository);

    // Create service instances
    const hashService = new HashService();
    const tokenService = new TokenService(tokenRepository, hashService);
    const friendshipService = new FriendshipService(friendshipRepository);
    const friendshipRequestService = new FriendshipRequestService(friendshipRequestRepository);

    // Create controller instance
    const friendshipRequestController = new FriendshipRequestController(friendshipRequestService, tokenService, friendshipService);

    // Create routes
    const friendshipRequestRoutes = createFriendshipRequestRoutes(friendshipRequestController);

    return { friendshipRequestRoutes };
}

module.exports = configureFriendshipRequestContainer;
