const { assertIsInstanceOfContract } = require("./interfaces/validation");

/**
 * Repository implementation for managing albums.
 * @class AlbumRepository
 */
class AlbumRepository {
    /**
     * Creates an instance of AlbumRepository.
     * @param {Object} repository - The repository instance to be used.
     * @param {Function} contract - The contract class that the repository must implement.
     * @throws {Error} Throws an error if the repository is not an instance of the contract class.
     */
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }

    /**
     * Creates a new album.
     * @param {string} description - The description of the album.
     * @param {number} targetId - The ID of the target associated with the album.
     * @returns {Promise} A promise that resolves with the result of the create operation.
     */
    create(description, targetId) {
        return this.repository.create(description, targetId);
    }

    /**
     * Retrieves an album by its ID.
     * @param {number} albumId - The ID of the album to retrieve.
     * @returns {Promise} A promise that resolves with the album.
     */
    getById(albumId) {
        return this.repository.getById(albumId);
    }

    /**
     * Retrieves all albums associated with a given ID.
     * @param {number} albumId - The ID to retrieve associated albums.
     * @returns {Promise} A promise that resolves with all albums.
     */
    getAll(albumId) {
        return this.repository.getAll(albumId);
    }

    /**
     * Updates an album by its ID.
     * @param {number} albumId - The ID of the album to update.
     * @param {string} description - The new description of the album.
     * @param {number} targetId - The new ID of the target associated with the album.
     * @returns {Promise} A promise that resolves when the album is updated.
     */
    update(albumId, description, targetId) {
        return this.repository.update(albumId, description, targetId);
    }

    /**
     * Deletes an album by its ID.
     * @param {number} albumId - The ID of the album to delete.
     * @returns {Promise} A promise that resolves when the album is deleted.
     */
    delete(albumId) {
        return this.repository.delete(albumId);
    }
}

module.exports = AlbumRepository;
