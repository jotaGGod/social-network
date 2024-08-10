const db = require('../../database/config/db');
const httpStatus = require('../../utils/statusCodes');
const ApiError = require("../../utils/ApiError");
const { IFriendshipRepository } = require("../interfaces/friendshipRepositoryAbstract");

/**
 * Implementation of the friendship repository.
 *
 * This class provides the implementation of the methods defined in the `IFriendshipRepository` interface for managing friendships in the database.
 */
class FriendshipRepositoryImplementation extends IFriendshipRepository {

    /**
     * Creates a new friendship.
     *
     * @param {number} principalUserId - The ID of the principal user (the one creating the friendship).
     * @param {number} friendId - The ID of the friend (the one being added).
     * @returns {Promise<number>} - Returns a Promise that resolves to the ID of the created friendship.
     * @throws {ApiError} - Throws an internal server error if creation fails.
     */
    async create(principalUserId, friendId) {
        try {
            const [friendship] = await db.transaction(async (trx) => {
                return db('friendship')
                    .transacting(trx)
                    .insert({
                        principal_user_id: principalUserId,
                        friend_id: friendId,
                        is_active: true
                    });
            });
            return friendship;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating a new friendship');
        }
    }

    /**
     * Retrieves all friendships for a user.
     *
     * @param {number} userId - The ID of the user whose friendships are to be retrieved.
     * @returns {Promise<Array<Object>>} - A list of all friendships for the user.
     * @throws {ApiError} - Throws an internal server error if retrieval fails.
     */
    async getAll(userId) {
        return db('friendship')
            .where({ principal_user_id: userId })
            .select('id', 'principal_user_id', 'friend_id', 'is_active');
    }

    /**
     * Retrieves a friendship by ID.
     *
     * @param {number} id - The ID of the friendship to be retrieved.
     * @returns {Promise<Object>} - The friendship object corresponding to the provided ID.
     * @throws {ApiError} - Throws an internal server error if retrieval fails.
     */
    async getById(id) {
        return db('friendship')
            .where({ id })
            .select('id', 'principal_user_id', 'friend_id', 'is_active')
            .first();
    }

    /**
     * Deletes a friendship.
     *
     * @param {number} id - The ID of the friendship to be deleted.
     * @returns {Promise<void>} - Returns a Promise that resolves when the operation is complete.
     * @throws {ApiError} - Throws an internal server error if deletion fails.
     */
    async delete(id) {
        try {
            await db.transaction(async (trx) => {
                await db('friendship')
                    .where({ id })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting friendship');
        }
    }
}

module.exports = FriendshipRepositoryImplementation;
