const { assertIsInstanceOfContract } = require("./interfaces/validation");

/**
 * Repository implementation for managing friendships.
 * @class FriendshipRepository
 */
class FriendshipRepository {
    /**
     * Creates an instance of FriendshipRepository.
     * @param {Object} repository - The repository instance to be used.
     * @param {Function} contract - The contract class that the repository must implement.
     * @throws {Error} Throws an error if the repository is not an instance of the contract class.
     */
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }

    /**
     * Creates a new friendship between two users.
     * @param {number} principalUserId - The ID of the principal user.
     * @param {number} friendId - The ID of the friend to be added.
     * @returns {Promise} A promise that resolves with the result of the create operation.
     */
    create(principalUserId, friendId) {
        return this.repository.create(principalUserId, friendId);
    }

    /**
     * Retrieves all friendships associated with a given user ID.
     * @param {number} userId - The ID of the user to retrieve friendships for.
     * @returns {Promise} A promise that resolves with all friendships.
     */
    getAll(userId) {
        return this.repository.getAll(userId);
    }

    /**
     * Retrieves a specific friendship by user ID.
     * @param {number} userId - The ID of the user to retrieve the friendship for.
     * @returns {Promise} A promise that resolves with the friendship.
     */
    getById(userId) {
        return this.repository.getById(userId);
    }

    /**
     * Deletes a friendship by user ID.
     * @param {number} userId - The ID of the user whose friendship is to be deleted.
     * @returns {Promise} A promise that resolves when the friendship is deleted.
     */
    delete(userId) {
        return this.repository.delete(userId);
    }
}

module.exports = FriendshipRepository;
