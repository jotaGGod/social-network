const express = require('express');
const validateSchema = require('../middlewares/commentsValidation');
const { createCommentSchema, updateCommentSchema, getByIdSchema, authorizationSchema } = require('../schemas/commentsSchema');

/**
 * Creates routes for managing comments.
 * @function createCommentRoutes
 * @param {Object} commentController - The controller instance for handling comment operations.
 * @returns {Object} An Express router with routes for comment operations.
 */
function createCommentRoutes(commentController) {
    const router = express.Router();

    /**
     * Route for creating a new comment.
     * @name POST /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @middlewares validateSchema - Middleware to validate request body against createCommentSchema.
     * @memberof createCommentRoutes
     */
    router.post('/', validateSchema(createCommentSchema), commentController.create.bind(commentController));

    /**
     * Route for retrieving comments by post ID.
     * @name GET /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @middlewares validateSchema - Middleware to validate request headers against authorizationSchema.
     * @memberof createCommentRoutes
     */
    router.get('/', validateSchema(authorizationSchema), commentController.getCommentsByPostId.bind(commentController));

    /**
     * Route for retrieving a comment by ID.
     * @name GET /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the comment to retrieve.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createCommentRoutes
     */
    router.get('/:id', validateSchema(getByIdSchema), commentController.getCommentById.bind(commentController));

    /**
     * Route for updating a comment by ID.
     * @name PUT /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the comment to update.
     * @param {Object} req.body - The updated comment data.
     * @middlewares validateSchema - Middleware to validate request body against updateCommentSchema.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createCommentRoutes
     */
    router.put('/:id', validateSchema(updateCommentSchema), commentController.updateComment.bind(commentController));

    /**
     * Route for deleting a comment by ID.
     * @name DELETE /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the comment to delete.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createCommentRoutes
     */
    router.delete('/:id', validateSchema(getByIdSchema), commentController.deleteComment.bind(commentController));

    return router;
}

module.exports = createCommentRoutes;
