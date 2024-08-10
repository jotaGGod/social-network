const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

/**
 * Interface for Album Repository
 * Ensures that concrete implementations have the required methods
 * @class IAlbumRepository
 */
class IAlbumRepository {
    /**
     * Creates an instance of IAlbumRepository.
     * Validates that the instance is concrete and implements required methods.
     * @memberof IAlbumRepository
     */
    constructor() {
        assertIsConcreteInstance(this, IAlbumRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'update');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = { IAlbumRepository };
