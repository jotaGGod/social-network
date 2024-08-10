const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { ITokenRepository } = require("../interfaces/tokenRepositoryAbstract");

/**
 * Implementation of the token repository.
 *
 * This class provides the implementation of the methods defined in the `ITokenRepository` interface for managing tokens in the database.
 */
class TokenRepositoryImplementation extends ITokenRepository {

    /**
     * Creates a new token in the database.
     *
     * @param {string} token - The value of the token to be created.
     * @param {number} userId - The ID of the user to whom the token belongs.
     * @returns {Promise<number[]>} - An array containing the ID of the created token.
     * @throws {ApiError} - Throws an internal server error if token creation fails.
     */
    create(token, userId) {
        try {
            return db('token').insert({
                value: token,
                user_id: userId
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating token');
        }
    }

    /**
     * Retrieves a token by the user ID.
     *
     * @param {number} userId - The ID of the user for which the token should be retrieved.
     * @returns {Promise<Object>} - The token corresponding to the user ID.
     * @throws {ApiError} - Throws an internal server error if the retrieval fails.
     */
    getTokenByUserId(userId) {
        try {
            return db('token').where({ user_id: userId }).first();
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting token by user ID');
        }
    }

    /**
     * Revokes (deletes) all tokens for a user by user ID.
     *
     * @param {number} userId - The ID of the user whose tokens should be revoked.
     * @throws {ApiError} - Throws an internal server error if revocation fails.
     */
    revokeTokenByUserId(userId) {
        try {
            db('token').where({ user_id: userId }).del();
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while revoking token');
        }
    }

    /**
     * Updates the value of a token by token ID.
     *
     * @param {number} id - The ID of the token to be updated.
     * @param {string} newToken - The new value of the token.
     * @throws {ApiError} - Throws an internal server error if the update fails.
     */
    updateById(id, newToken) {
        try {
            db('token').where({ id: id }).update({ value: newToken });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while updating token');
        }
    }
}

module.exports = TokenRepositoryImplementation;
