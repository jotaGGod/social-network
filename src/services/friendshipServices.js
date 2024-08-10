const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Service class for managing friendships.
 */
class FriendshipService {
    /**
     * Creates an instance of FriendshipService.
     * @param {Object} friendshipRepository - The repository for friendship data.
     */
    constructor(friendshipRepository) {
        this.friendshipRepository = friendshipRepository;
    };

    /**
     * Creates a new friendship between two users.
     * @param {number} principalUserId - The ID of the principal user initiating the friendship.
     * @param {number} friendId - The ID of the user to be added as a friend.
     * @returns {Promise<Object>} A promise that resolves to the created friendship.
     */
    create(principalUserId, friendId) {
        return this.friendshipRepository.create(principalUserId, friendId);
    };

    /**
     * Retrieves all friendships for a specific user.
     * @param {number} userId - The ID of the user whose friendships are to be retrieved.
     * @returns {Promise<Array>} A promise that resolves to an array of friendships for the specified user.
     */
    getAllFriendships(userId) {
        return this.friendshipRepository.getAll(userId);
    };

    /**
     * Retrieves a friendship by its ID.
     * @param {number} friendshipId - The ID of the friendship to retrieve.
     * @throws {ApiError} If the friendship is not found.
     * @returns {Promise<Object>} A promise that resolves to the friendship with the specified ID.
     */
    async getById(friendshipId) {
        const friendship = await this.friendshipRepository.getById(friendshipId);
        if (!friendship) throw new ApiError(httpStatus.NOT_FOUND, 'Friendship not found.');
        return friendship;
    };

    /**
     * Deletes a friendship by its ID.
     * @param {number} friendshipId - The ID of the friendship to delete.
     * @throws {ApiError} If the friendship is not found.
     * @returns {Promise<void>} A promise that resolves when the friendship is deleted.
     */
    async deleteFriendship(friendshipId) {
        const friendship = await this.friendshipRepository.getById(friendshipId);
        if (!friendship) throw new ApiError(httpStatus.NOT_FOUND, 'Friendship not found.');
        await this.friendshipRepository.delete(friendshipId);
    };
}

module.exports = FriendshipService;
