const { assertIsInstanceOfContract } = require("./interfaces/validation");

/**
 * Repository implementation for managing friendship requests.
 * @class FriendshipRequestRepository
 */
class FriendshipRequestRepository {
    /**
     * Creates an instance of FriendshipRequestRepository.
     * @param {Object} repository - The repository instance to be used.
     * @param {Function} contract - The contract class that the repository must implement.
     * @throws {Error} Throws an error if the repository is not an instance of the contract class.
     */
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }

    /**
     * Creates a new friendship request.
     * @param {number} senderId - The ID of the user sending the request.
     * @param {number} receiverId - The ID of the user receiving the request.
     * @returns {Promise} A promise that resolves with the result of the create operation.
     */
    create(senderId, receiverId) {
        return this.repository.create(senderId, receiverId);
    }

    /**
     * Retrieves all friendship requests for a given user ID.
     * @param {number} userId - The ID of the user to retrieve requests for.
     * @returns {Promise} A promise that resolves with all friendship requests.
     */
    getAll(userId) {
        return this.repository.getAll(userId);
    }

    /**
     * Accepts a friendship request by its ID.
     * @param {number} requestId - The ID of the request to accept.
     * @returns {Promise} A promise that resolves with the result of the accept operation.
     */
    accept(requestId) {
        return this.repository.accept(requestId);
    }

    /**
     * Deletes a friendship request by its ID.
     * @param {number} requestId - The ID of the request to delete.
     * @returns {Promise} A promise that resolves when the request is deleted.
     */
    delete(requestId) {
        return this.repository.delete(requestId);
    }
}

module.exports = FriendshipRequestRepository;
