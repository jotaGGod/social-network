const { assertIsInstanceOfContract } = require("./interfaces/validation");

/**
 * Repository implementation for managing file types.
 * @class FileTypeRepository
 */
class FileTypeRepository {
    /**
     * Creates an instance of FileTypeRepository.
     * @param {Object} repository - The repository instance to be used.
     * @param {Function} contract - The contract class that the repository must implement.
     * @throws {Error} Throws an error if the repository is not an instance of the contract class.
     */
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }

    /**
     * Creates a new file type.
     * @param {Object} newFileType - The new file type to be created.
     * @returns {Promise} A promise that resolves with the result of the create operation.
     */
    create(newFileType) {
        return this.repository.create(newFileType);
    }

    /**
     * Retrieves all file types.
     * @returns {Promise} A promise that resolves with all file types.
     */
    getAll() {
        return this.repository.getAll();
    }

    /**
     * Retrieves a file type by its ID.
     * @param {number} fileTypeId - The ID of the file type to retrieve.
     * @returns {Promise} A promise that resolves with the file type.
     */
    getById(fileTypeId) {
        return this.repository.getById(fileTypeId);
    }

    /**
     * Deletes a file type by its ID.
     * @param {number} fileTypeId - The ID of the file type to delete.
     * @returns {Promise} A promise that resolves when the file type is deleted.
     */
    delete(fileTypeId) {
        return this.repository.delete(fileTypeId);
    }
}

module.exports = FileTypeRepository;
