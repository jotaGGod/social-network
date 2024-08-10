const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

/**
 * Interface for Reaction Type Repository
 * Ensures that concrete implementations have the required methods
 * @class IReactionTypeRepository
 */
class IReactionTypeRepository {
    /**
     * Creates an instance of IReactionTypeRepository.
     * Validates that the instance is concrete and implements required methods.
     * @memberof IReactionTypeRepository
     */
    constructor() {
        assertIsConcreteInstance(this, IReactionTypeRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IReactionTypeRepository };
