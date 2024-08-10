const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

/**
 * Interface for Reaction Repository
 * Ensures that concrete implementations have the required methods
 * @class IReactionRepository
 */
class IReactionRepository {
    /**
     * Creates an instance of IReactionRepository.
     * Validates that the instance is concrete and implements required methods.
     * @memberof IReactionRepository
     */
    constructor() {
        assertIsConcreteInstance(this, IReactionRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'update');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IReactionRepository };
