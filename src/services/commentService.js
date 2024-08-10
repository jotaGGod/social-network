const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Service class for managing comments.
 */
class CommentService {
    /**
     * Creates an instance of CommentService.
     * @param {Object} commentRepository - The repository for managing comment data.
     */
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    };

    /**
     * Creates a new comment.
     * @param {string} description - The content of the comment.
     * @param {number} userId - The ID of the user creating the comment.
     * @param {number} postId - The ID of the post to which the comment belongs.
     * @returns {Promise<Object>} The created comment.
     */
    create(description, userId, postId) {
        return this.commentRepository.create(description, userId, postId);
    };

    /**
     * Retrieves a comment by its ID.
     * @param {number} commentId - The ID of the comment to retrieve.
     * @throws {ApiError} Throws an error if the comment is not found.
     * @returns {Promise<Object>} The comment with the specified ID.
     */
    async getCommentById(commentId) {
        const comment = await this.commentRepository.getById(commentId);
        if (!comment) throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
        return comment;
    };

    /**
     * Retrieves all comments associated with a specific post.
     * @param {number} postId - The ID of the post to retrieve comments for.
     * @returns {Promise<Array>} An array of comments associated with the post.
     */
    getAllComments(postId) {
        return this.commentRepository.getAll(postId);
    };

    /**
     * Updates an existing comment.
     * @param {number} commentId - The ID of the comment to update.
     * @param {string} description - The new content of the comment.
     * @throws {ApiError} Throws an error if the comment is not found.
     * @returns {Promise<void>}
     */
    async updateComment(commentId, description) {
        const comment = await this.commentRepository.getById(commentId);
        if (!comment) throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
        await this.commentRepository.update(commentId, description);
    };

    /**
     * Deletes a comment by its ID.
     * @param {number} commentId - The ID of the comment to delete.
     * @throws {ApiError} Throws an error if the comment is not found.
     * @returns {Promise<void>}
     */
    async deleteComment(commentId) {
        const comment = await this.commentRepository.getById(commentId);
        if (!comment) throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
        await this.commentRepository.delete(commentId);
    };
}

module.exports = CommentService;
