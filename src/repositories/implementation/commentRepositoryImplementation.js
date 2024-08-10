const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { ICommentRepository } = require("../interfaces/commentRepositoryAbstract");

/**
 * Implementation of the comment repository.
 *
 * This class provides the implementation of the methods defined in the `ICommentRepository` interface for managing comments in the database.
 */
class CommentRepositoryImplementation extends ICommentRepository {

    /**
     * Creates a new comment.
     *
     * @param {string} description - The text of the comment.
     * @param {number} user_id - The ID of the user who made the comment.
     * @param {number} post_id - The ID of the post on which the comment was made.
     * @returns {Promise<Object>} - Returns a Promise that resolves to the created comment object.
     * @throws {ApiError} - Throws an internal server error if creation fails.
     */
    async create(description, user_id, post_id) {
        try {
            const [comment] = await db('comment')
                .insert({
                    description,
                    user_id,
                    post_id,
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                })
                .returning('*');
            return comment;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating a comment');
        }
    }

    /**
     * Retrieves a comment by ID.
     *
     * @param {number} id - The ID of the comment to be retrieved.
     * @returns {Promise<Object>} - Returns a Promise that resolves to the comment object corresponding to the provided ID.
     * @throws {ApiError} - Throws an internal server error if retrieval fails.
     */
    getById(id) {
        try {
            return db('comment').where({ id }).first();
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while fetching comment by id');
        }
    };

    /**
     * Retrieves all comments from a specific user.
     *
     * @param {number} userId - The ID of the user whose comments will be retrieved.
     * @returns {Promise<Array<Object>>} - Returns a list of comments from the user.
     * @throws {ApiError} - Throws an internal server error if retrieval fails.
     */
    getAll(userId) {
        try {
            return db('comment').where({ user_id: userId });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while fetching comments');
        }
    };

    /**
     * Updates an existing comment.
     *
     * @param {number} commentId - The ID of the comment to be updated.
     * @param {string} description - The new text of the comment.
     * @returns {Promise<void>} - Returns a Promise that resolves when the operation is complete.
     * @throws {ApiError} - Throws an internal server error if the update fails.
     */
    async update(commentId, description) {
        try {
            await db.transaction(async (trx) => {
                await db('comment')
                    .where({ id: commentId })
                    .update({
                        description: description,
                        updated_at: new Date()
                    })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while updating comment');
        }
    };

    /**
     * Deletes a comment.
     *
     * @param {number} commentId - The ID of the comment to be deleted.
     * @returns {Promise<void>} - Returns a Promise that resolves when the operation is complete.
     * @throws {ApiError} - Throws an internal server error if deletion fails.
     */
    async delete(commentId) {
        try {
            await db('comment')
                .where({ id: commentId })
                .update({ is_active: false });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting comment');
        }
    };
}

module.exports = CommentRepositoryImplementation;
