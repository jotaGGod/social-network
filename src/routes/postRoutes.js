const express = require('express');
const PostController = require('../controller/postController');
const validateSchema  = require('../middlewares/postValidation');
const { createPostSchema, updatePostSchema, getByIdSchema, authorizationSchema } = require('../schemas/postSchema');

/**
 * Creates routes for managing posts.
 * @function createPostRoutes
 * @param {PostController} postController - The controller instance for handling post operations.
 * @returns {express.Router} An Express router with routes for post operations.
 */
function createPostRoutes(postController) {
    const router = express.Router();

    /**
     * Route for creating a new post.
     * @name POST /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {Object} req.body - The request body containing post details.
     * @middlewares validateSchema - Middleware to validate request body against createPostSchema.
     * @memberof createPostRoutes
     */
    router.post('/', validateSchema(createPostSchema), postController.createPost.bind(postController));

    /**
     * Route for retrieving all posts.
     * @name GET /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @middlewares validateSchema - Middleware to validate request headers and/or query parameters against authorizationSchema.
     * @memberof createPostRoutes
     */
    router.get('/', validateSchema(authorizationSchema), postController.getPosts.bind(postController));

    /**
     * Route for retrieving a post by ID.
     * @name GET /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the post to retrieve.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createPostRoutes
     */
    router.get('/:id', validateSchema(getByIdSchema), postController.getPostById.bind(postController));

    /**
     * Route for updating a post by ID.
     * @name PUT /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the post to update.
     * @param {Object} req.body - The request body containing updated post details.
     * @middlewares validateSchema - Middleware to validate request body against updatePostSchema.
     * @memberof createPostRoutes
     */
    router.put('/:id', validateSchema(updatePostSchema), postController.updatePost.bind(postController));

    /**
     * Route for deleting a post by ID.
     * @name DELETE /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the post to delete.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createPostRoutes
     */
    router.delete('/:id', validateSchema(getByIdSchema), postController.deletePost.bind(postController));

    return router;
}

module.exports = createPostRoutes;
