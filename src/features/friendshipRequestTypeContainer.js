const FriendshipRequestTypeRepositoryImplementation = require("../repositories/implementation/friendshipRequestTypeRepository");
const FriendshipRequestTypeRepository = require("../repositories/friendshipRequestTypeRepository");
const FriendshipRequestTypeService = require("../services/friendshipRequestTypeService");
const FriendshipRequestTypeController = require("../controller/friendshipRequestTypeController");
const createFriendshipRequestTypeRoutes = require("../routes/friendshipRequestTypeRoutes");
const { IFriendshipRequestTypeRepository } = require("../repositories/interfaces/friendshipRequestTypeAbstract");

/**
 * Configures the Friendship Request Type container.
 * @returns {object} The configured friendship request type routes.
 */
function configureFriendshipRequestTypeContainer() {
    // Instantiate the repository implementation
    const friendshipRequestTypeRepositoryImplementation = new FriendshipRequestTypeRepositoryImplementation();

    // Create repository instance
    const friendshipRequestTypeRepository = new FriendshipRequestTypeRepository(friendshipRequestTypeRepositoryImplementation, IFriendshipRequestTypeRepository);

    // Create service instance
    const friendshipRequestTypeService = new FriendshipRequestTypeService(friendshipRequestTypeRepository);

    // Create controller instance
    const friendshipRequestTypeController = new FriendshipRequestTypeController(friendshipRequestTypeService);

    // Create routes
    const friendshipRequestTypeRoutes = createFriendshipRequestTypeRoutes(friendshipRequestTypeController);

    return { friendshipRequestTypeRoutes };
}

module.exports = configureFriendshipRequestTypeContainer;
