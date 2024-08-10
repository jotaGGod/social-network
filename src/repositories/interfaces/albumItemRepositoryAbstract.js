const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

/**
 * Interface for Album Item Repository
 * Ensures that concrete implementations have the required methods
 * @class IAlbumItemRepository
 */
class IAlbumItemRepository {
    /**
     * Creates an instance of IAlbumItemRepository.
     * Validates that the instance is concrete and implements required methods.
     * @memberof IAlbumItemRepository
     */
    constructor() {
        assertIsConcreteInstance(this, IAlbumItemRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IAlbumItemRepository };
