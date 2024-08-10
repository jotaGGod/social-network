const { assertIsInstanceOfContract } = require("./interfaces/validation");

/**
 * Repository implementation for managing tokens.
 * @class TokenRepository
 */
class TokenRepository {
    /**
     * Creates an instance of TokenRepository.
     * @param {Object} repository - The repository instance to be used.
     * @param {Function} contract - The contract class that the repository must implement.
     * @throws {Error} Throws an error if the repository is not an instance of the contract class.
     */
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }

    /**
     * Creates a new token.
     * @param {string} token - The token to be created.
     * @param {number} userId - The ID of the user associated with the token.
     * @returns {Promise} A promise that resolves with the result of the create operation.
     */
    create(token, userId) {
        return this.repository.create(token, userId);
    }

    /**
     * Retrieves a token by user ID.
     * @param {number} userId - The ID of the user whose token is to be retrieved.
     * @returns {Promise} A promise that resolves with the token.
     */
    getTokenByUserId(userId) {
        return this.repository.getTokenByUserId(userId);
    }

    /**
     * Revokes a token by user ID.
     * @param {number} userId - The ID of the user whose token is to be revoked.
     * @returns {Promise} A promise that resolves when the token is revoked.
     */
    revokeTokenByUserId(userId) {
        return this.repository.revokeTokenByUserId(userId);
    }

    /**
     * Updates a token by its ID.
     * @param {number} tokenId - The ID of the token to be updated.
     * @param {string} newToken - The new token value.
     * @returns {Promise} A promise that resolves when the token is updated.
     */
    updateById(tokenId, newToken) {
        return this.repository.updateById(tokenId, newToken);
    }
}

module.exports = TokenRepository;
