const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IReactionRepository } = require("../interfaces/reactionRepositoryAbstract");

/**
 * Implementation of the reaction repository.
 *
 * This class provides the implementation of the methods defined in the `IReactionRepository` interface for managing reactions in the database.
 */
class ReactionRepositoryImplementation extends IReactionRepository {

    /**
     * Creates a new reaction in the database.
     *
     * @param {number} userId - The ID of the user who created the reaction.
     * @param {number} reactionTypeId - The ID of the reaction type.
     * @param {number} postId - The ID of the post to which the reaction is associated.
     * @returns {Promise<number>} - The ID of the newly created reaction.
     * @throws {ApiError} - Throws an internal server error if creation fails.
     */
    async create(userId, reactionTypeId, postId) {
        try {
            const [reaction] = await db.transaction(async (trx) => {
                return db('reaction')
                    .transacting(trx)
                    .insert({
                        user_id: userId,
                        reaction_type_id: reactionTypeId,
                        post_id: postId
                    });
            });
            return reaction;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating reaction');
        }
    }

    /**
     * Retrieves a reaction by its ID.
     *
     * @param {number} reactionId - The ID of the reaction to be retrieved.
     * @returns {Promise<Object>} - The reaction corresponding to the provided ID.
     */
    async getById(reactionId) {
        return db('reaction')
            .where({ id: reactionId })
            .select('id', 'user_id', 'reaction_type_id', 'post_id', 'is_active')
            .first();
    }

    /**
     * Retrieves all reactions for a specific user.
     *
     * @param {number} userId - The ID of the user whose reactions are to be retrieved.
     * @returns {Promise<Array<Object>>} - A list of reactions associated with the user.
     */
    async getAll(userId) {
        return db('reaction')
            .where({ user_id: userId })
            .select('id', 'user_id', 'reaction_type_id', 'post_id', 'is_active');
    }

    /**
     * Updates an existing reaction.
     *
     * @param {number} id - The ID of the reaction to be updated.
     * @param {number} userId - The new ID of the user associated with the reaction.
     * @param {number} reactionTypeId - The new ID of the reaction type.
     * @param {number} postId - The new ID of the post associated with the reaction.
     * @throws {ApiError} - Throws an internal server error if the update fails.
     */
    async update(id, userId, reactionTypeId, postId) {
        try {
            await db.transaction(async (trx) => {
                await db('reaction')
                    .where({ id })
                    .update({
                        user_id: userId,
                        reaction_type_id: reactionTypeId,
                        post_id: postId
                    })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while updating reaction');
        }
    }

    /**
     * Deletes a reaction by its ID.
     *
     * @param {number} reactionId - The ID of the reaction to be deleted.
     * @throws {ApiError} - Throws an internal server error if deletion fails.
     */
    async delete(reactionId) {
        try {
            await db.transaction(async (trx) => {
                await db('reaction')
                    .where({ id: reactionId })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting reaction');
        }
    }
}

module.exports = ReactionRepositoryImplementation;
