const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

/**
 * Interface for User Repository
 * Ensures that concrete implementations have the required methods
 * @class IUserRepository
 */
class IUserRepository {
    /**
     * Creates an instance of IUserRepository.
     * Validates that the instance is concrete and implements required methods.
     * @memberof IUserRepository
     */
    constructor() {
        assertIsConcreteInstance(this, IUserRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getByEmail');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'update');
        assertMethodImplemented(this, 'delete');
        assertMethodImplemented(this, 'getFeedNews');
        assertMethodImplemented(this, 'getPostStatistics');
    }
}

module.exports = { IUserRepository };
