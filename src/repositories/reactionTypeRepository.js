const { assertIsInstanceOfContract } = require("./interfaces/validation");

/**
 * Repository implementation for managing reaction types.
 * @class ReactionTypeRepository
 */
class ReactionTypeRepository {
    /**
     * Creates an instance of ReactionTypeRepository.
     * @param {Object} repository - The repository instance to be used.
     * @param {Function} contract - The contract class that the repository must implement.
     * @throws {Error} Throws an error if the repository is not an instance of the contract class.
     */
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }

    /**
     * Creates a new reaction type.
     * @param {string} reactionTypeDescription - The description of the reaction type to be created.
     * @returns {Promise} A promise that resolves with the result of the create operation.
     */
    create(reactionTypeDescription) {
        return this.repository.create(reactionTypeDescription);
    }

    /**
     * Retrieves a reaction type by its ID.
     * @param {number} reactionTypeId - The ID of the reaction type to retrieve.
     * @returns {Promise} A promise that resolves with the reaction type.
     */
    getById(reactionTypeId) {
        return this.repository.getById(reactionTypeId);
    }

    /**
     * Retrieves all reaction types.
     * @returns {Promise} A promise that resolves with all reaction types.
     */
    getAll() {
        return this.repository.getAll();
    }

    /**
     * Deletes a reaction type by its ID.
     * @param {number} reactionTypeId - The ID of the reaction type to delete.
     * @returns {Promise} A promise that resolves when the reaction type is deleted.
     */
    delete(reactionTypeId) {
        return this.repository.delete(reactionTypeId);
    }
}

module.exports = ReactionTypeRepository;
