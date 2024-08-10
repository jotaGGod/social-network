const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

/**
 * Interface for Target Public Repository
 * Ensures that concrete implementations have the required methods
 * @class ITargetPublicRepository
 */
class ITargetPublicRepository {
    /**
     * Creates an instance of ITargetPublicRepository.
     * Validates that the instance is concrete and implements required methods.
     * @memberof ITargetPublicRepository
     */
    constructor() {
        assertIsConcreteInstance(this, ITargetPublicRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { ITargetPublicRepository };
