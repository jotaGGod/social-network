const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

/**
 * Interface for Friendship Repository
 * Ensures that concrete implementations have the required methods
 * @class IFriendshipRepository
 */
class IFriendshipRepository {
    /**
     * Creates an instance of IFriendshipRepository.
     * Validates that the instance is concrete and implements required methods.
     * @memberof IFriendshipRepository
     */
    constructor() {
        assertIsConcreteInstance(this, IFriendshipRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IFriendshipRepository };
