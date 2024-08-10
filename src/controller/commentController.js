const httpStatus = require('../utils/statusCodes');

class CommentController {
    /**
     * Creates an instance of CommentController.
     * @param {object} commentService - The comment service.
     * @param {object} tokenService - The token service.
     */
    constructor(commentService, tokenService) {
        this.commentService = commentService;
        this.tokenService = tokenService;
    }

    /**
     * Creates a new comment.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The created comment.
     */
    async create(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const { description, post_id: postId } = req.body;
        const comment = await this.commentService.create(description, userId, postId);
        return res.status(httpStatus.CREATED).json({
            message: 'Comment created successfully!',
            data: comment
        });
    }

    /**
     * Gets a comment by ID.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The comment.
     */
    async getCommentById(req, res) {
        const { id: commentId } = req.params;
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const comment = await this.commentService.getCommentById(commentId);
        return res.status(httpStatus.OK).json(comment);
    }

    /**
     * Gets all comments for a user by post ID.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object[]>} The list of comments.
     */
    async getCommentsByPostId(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const comments = await this.commentService.getAllComments(userId);
        return res.status(httpStatus.OK).json(comments);
    }

    /**
     * Updates a comment.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The update confirmation.
     */
    async updateComment(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id: commentId } = req.params;
        const { description } = req.body;
        await this.commentService.updateComment(commentId, description);
        return res.status(httpStatus.OK).json({
            details: "Comment updated successfully"
        });
    }

    /**
     * Deletes a comment.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The deletion confirmation.
     */
    async deleteComment(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id: commentId } = req.params;
        await this.commentService.deleteComment(commentId);
        return res.status(httpStatus.OK).json({
            details: "Comment deleted successfully"
        });
    }
}

module.exports = CommentController;
