const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

/**
 * Interface for Post Repository
 * Ensures that concrete implementations have the required methods
 * @class IPostRepository
 */
class IPostRepository {
    /**
     * Creates an instance of IPostRepository.
     * Validates that the instance is concrete and implements required methods.
     * @memberof IPostRepository
     */
    constructor() {
        assertIsConcreteInstance(this, IPostRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'update');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IPostRepository };
