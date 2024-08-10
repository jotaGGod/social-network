const { assertIsConcreteInstance, assertMethodImplemented } = require("./validation");

/**
 * Interface for Token Repository
 * Ensures that concrete implementations have the required methods
 * @class ITokenRepository
 */
class ITokenRepository {
    /**
     * Creates an instance of ITokenRepository.
     * Validates that the instance is concrete and implements required methods.
     * @memberof ITokenRepository
     */
    constructor() {
        assertIsConcreteInstance(this, ITokenRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getTokenByUserId');
        assertMethodImplemented(this, 'revokeTokenByUserId');
        assertMethodImplemented(this, 'updateById');
    }
}

module.exports = { ITokenRepository };
