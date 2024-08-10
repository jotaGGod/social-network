const db = require('../../database/config/db');
const httpStatus = require('../../utils/statusCodes');
const ApiError = require("../../utils/ApiError");
const { IPostRepository } = require("../interfaces/postRepositoryAbstract");

/**
 * Implementation of the post repository.
 *
 * This class provides the implementation of the methods defined in the `IPostRepository` interface for managing posts in the database.
 */
class PostRepositoryImplementation extends IPostRepository {

    /**
     * Creates a new post in the database.
     *
     * @param {string} description - The description of the post.
     * @param {number} userId - The ID of the user who created the post.
     * @param {number} targetId - The ID of the target of the post.
     * @param {number} typeId - The ID of the post type.
     * @returns {Promise<number>} - The ID of the newly created post.
     * @throws {ApiError} - Throws an internal server error if creation fails.
     */
    async create(description, userId, targetId, typeId) {
        try {
            const [post] = await db.transaction(async (trx) => {
                return db('post')
                    .transacting(trx)
                    .insert({
                        description: description,
                        user_id: userId,
                        target_id: targetId,
                        type_id: typeId
                    });
            });
            return post;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating post');
        }
    }

    /**
     * Retrieves a post by its ID.
     *
     * @param {number} postId - The ID of the post to be retrieved.
     * @returns {Promise<Object>} - The post corresponding to the provided ID.
     */
    async getById(postId) {
        return db('post')
            .where({ id: postId })
            .select('id', 'description', 'user_id', 'target_id', 'type_id', 'is_active')
            .first();
    }

    /**
     * Retrieves all posts for a specific user.
     *
     * @param {number} userId - The ID of the user whose posts are to be retrieved.
     * @returns {Promise<Array<Object>>} - A list of posts associated with the user.
     */
    async getAll(userId) {
        return db('post')
            .where({ user_id: userId })
            .select('id', 'description', 'user_id', 'target_id', 'type_id', 'is_active');
    }

    /**
     * Updates an existing post.
     *
     * @param {number} id - The ID of the post to be updated.
     * @param {string} description - The new description of the post.
     * @param {number} targetId - The new ID of the target of the post.
     * @param {number} typeId - The new ID of the post type.
     * @throws {ApiError} - Throws an internal server error if the update fails.
     */
    async update(id, description, targetId, typeId) {
        try {
            await db.transaction(async (trx) => {
                await db('post')
                    .where({ id })
                    .update({
                        description: description,
                        target_id: targetId,
                        type_id: typeId
                    })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while updating post');
        }
    }

    /**
     * Deletes a post by its ID.
     *
     * @param {number} postId - The ID of the post to be deleted.
     * @throws {ApiError} - Throws an internal server error if deletion fails.
     */
    async delete(postId) {
        try {
            await db.transaction(async (trx) => {
                await db('post')
                    .where({ id: postId })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting post');
        }
    }
}

module.exports = PostRepositoryImplementation;
