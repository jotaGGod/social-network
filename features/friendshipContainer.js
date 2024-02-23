const FriendshipRepositoryImplementation = require("../repositories/mySql/friendshipRepositoryImplementation");
const FriendshipRepository = require("../repositories/friendshipRepository");
const FriendshipService = require("../services/friendshipServices");
const FriendshipController = require("../controller/friendshipController");
const createFriendshipRoutes = require("../routes/friendshipRoutes");

function configureFriendshipContainer() {
    const friendshipRepositoryImplementation = new FriendshipRepositoryImplementation();
    const friendshipRepository = new FriendshipRepository(friendshipRepositoryImplementation);
    const friendshipService = new FriendshipService(friendshipRepository);
    const friendshipController = new FriendshipController(friendshipService);
    const friendshipRoutes = createFriendshipRoutes(friendshipController);
    return { friendshipRoutes }
}

module.exports = configureFriendshipContainer;
