const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

/**
 * Interface for Comment Repository
 * Ensures that concrete implementations have the required methods
 * @class ICommentRepository
 */
class ICommentRepository {
    /**
     * Creates an instance of ICommentRepository.
     * Validates that the instance is concrete and implements required methods.
     * @memberof ICommentRepository
     */
    constructor() {
        assertIsConcreteInstance(this, ICommentRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'update');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { ICommentRepository };
