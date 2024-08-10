const { assertIsInstanceOfContract } = require("./interfaces/validation");

/**
 * Repository implementation for managing album items.
 * @class AlbumItemRepository
 */
class AlbumItemRepository {
    /**
     * Creates an instance of AlbumItemRepository.
     * @param {Object} repository - The repository instance to be used.
     * @param {Function} contract - The contract class that the repository must implement.
     * @throws {Error} Throws an error if the repository is not an instance of the contract class.
     */
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }

    /**
     * Creates a new album item.
     * @param {number} postId - The ID of the post associated with the album item.
     * @param {number} albumItemId - The ID of the album item to create.
     * @returns {Promise} A promise that resolves with the result of the create operation.
     */
    create(postId, albumItemId) {
        return this.repository.create(postId, albumItemId);
    }

    /**
     * Retrieves an album item by its ID.
     * @param {number} albumItemId - The ID of the album item to retrieve.
     * @returns {Promise} A promise that resolves with the album item.
     */
    getById(albumItemId) {
        return this.repository.getById(albumItemId);
    }

    /**
     * Retrieves all album items associated with a given ID.
     * @param {number} albumItemId - The ID of the album item to retrieve.
     * @returns {Promise} A promise that resolves with all album items.
     */
    getAll(albumItemId) {
        return this.repository.getAll(albumItemId);
    }

    /**
     * Deletes an album item by its ID.
     * @param {number} albumItemId - The ID of the album item to delete.
     * @returns {Promise} A promise that resolves when the album item is deleted.
     */
    delete(albumItemId) {
        return this.repository.delete(albumItemId);
    }
}

module.exports = AlbumItemRepository;
