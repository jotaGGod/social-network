const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

/**
 * Interface for File Type Repository
 * Ensures that concrete implementations have the required methods
 * @class IFileTypeRepository
 */
class IFileTypeRepository {
    /**
     * Creates an instance of IFileTypeRepository.
     * Validates that the instance is concrete and implements required methods.
     * @memberof IFileTypeRepository
     */
    constructor() {
        assertIsConcreteInstance(this, IFileTypeRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IFileTypeRepository };
