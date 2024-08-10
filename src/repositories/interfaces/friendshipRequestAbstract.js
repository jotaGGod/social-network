const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

/**
 * Interface for Friendship Request Repository
 * Ensures that concrete implementations have the required methods
 * @class IFriendshipRequestRepository
 */
class IFriendshipRequestRepository {
    /**
     * Creates an instance of IFriendshipRequestRepository.
     * Validates that the instance is concrete and implements required methods.
     * @memberof IFriendshipRequestRepository
     */
    constructor() {
        assertIsConcreteInstance(this, IFriendshipRequestRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'accept');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IFriendshipRequestRepository };
