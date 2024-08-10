const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

/**
 * Interface for Friendship Request Type Repository
 * Ensures that concrete implementations have the required methods
 * @class IFriendshipRequestTypeRepository
 */
class IFriendshipRequestTypeRepository {
    /**
     * Creates an instance of IFriendshipRequestTypeRepository.
     * Validates that the instance is concrete and implements required methods.
     * @memberof IFriendshipRequestTypeRepository
     */
    constructor() {
        assertIsConcreteInstance(this, IFriendshipRequestTypeRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IFriendshipRequestTypeRepository };
