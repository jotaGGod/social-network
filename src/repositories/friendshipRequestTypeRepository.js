const { assertIsInstanceOfContract } = require("./interfaces/validation");

/**
 * Repository implementation for managing friendship request types.
 * @class FriendshipRequestTypeRepository
 */
class FriendshipRequestTypeRepository {
    /**
     * Creates an instance of FriendshipRequestTypeRepository.
     * @param {Object} repository - The repository instance to be used.
     * @param {Function} contract - The contract class that the repository must implement.
     * @throws {Error} Throws an error if the repository is not an instance of the contract class.
     */
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }

    /**
     * Creates a new friendship request type.
     * @param {Object} newFriendshipRequestType - The new friendship request type to be created.
     * @returns {Promise} A promise that resolves with the result of the create operation.
     */
    create(newFriendshipRequestType) {
        return this.repository.create(newFriendshipRequestType);
    }

    /**
     * Retrieves all friendship request types.
     * @returns {Promise} A promise that resolves with all friendship request types.
     */
    getAll() {
        return this.repository.getAll();
    }

    /**
     * Retrieves a friendship request type by its ID.
     * @param {number} friendshipRequestId - The ID of the friendship request type to retrieve.
     * @returns {Promise} A promise that resolves with the friendship request type.
     */
    getById(friendshipRequestId) {
        return this.repository.getById(friendshipRequestId);
    }

    /**
     * Deletes a friendship request type by its ID.
     * @param {number} friendshipRequestId - The ID of the friendship request type to delete.
     * @returns {Promise} A promise that resolves when the friendship request type is deleted.
     */
    delete(friendshipRequestId) {
        return this.repository.delete(friendshipRequestId);
    }
}

module.exports = FriendshipRequestTypeRepository;
