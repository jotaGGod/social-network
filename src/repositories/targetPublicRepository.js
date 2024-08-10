const { assertIsInstanceOfContract } = require("./interfaces/validation");

/**
 * Repository implementation for managing target publics.
 * @class TargetPublicRepository
 */
class TargetPublicRepository {
    /**
     * Creates an instance of TargetPublicRepository.
     * @param {Object} repository - The repository instance to be used.
     * @param {Function} contract - The contract class that the repository must implement.
     * @throws {Error} Throws an error if the repository is not an instance of the contract class.
     */
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }

    /**
     * Creates a new target public.
     * @param {string} type - The type of the target public to be created.
     * @returns {Promise} A promise that resolves with the result of the create operation.
     */
    create(type) {
        return this.repository.create(type);
    }

    /**
     * Retrieves all target publics.
     * @returns {Promise} A promise that resolves with all target publics.
     */
    getAll() {
        return this.repository.getAll();
    }

    /**
     * Retrieves a target public by its ID.
     * @param {number} targetPublicId - The ID of the target public to retrieve.
     * @returns {Promise} A promise that resolves with the target public.
     */
    getById(targetPublicId) {
        return this.repository.getById(targetPublicId);
    }

    /**
     * Deletes a target public by its ID.
     * @param {number} targetPublicId - The ID of the target public to delete.
     * @returns {Promise} A promise that resolves when the target public is deleted.
     */
    delete(targetPublicId) {
        return this.repository.delete(targetPublicId);
    }
}

module.exports = TargetPublicRepository;
