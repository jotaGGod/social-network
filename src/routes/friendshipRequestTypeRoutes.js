const express = require('express');
const validateSchema = require('../middlewares/friendshipRequestTypeValidation');
const { createFriendshipRequestTypeSchema, getByIdSchema } = require('../schemas/friendshipRequestTypeSchema');

/**
 * Creates routes for managing friendship request types.
 * @function createFriendshipRequestTypeRoutes
 * @param {Object} friendshipRequestTypeController - The controller instance for handling friendship request type operations.
 * @returns {Object} An Express router with routes for friendship request type operations.
 */
function createFriendshipRequestTypeRoutes(friendshipRequestTypeController) {
    const router = express.Router();

    /**
     * Route for creating a new friendship request type.
     * @name POST /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @middlewares validateSchema - Middleware to validate request body against createFriendshipRequestTypeSchema.
     * @memberof createFriendshipRequestTypeRoutes
     */
    router.post('/', validateSchema(createFriendshipRequestTypeSchema), friendshipRequestTypeController.create.bind(friendshipRequestTypeController));

    /**
     * Route for retrieving all friendship request types.
     * @name GET /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @memberof createFriendshipRequestTypeRoutes
     */
    router.get('/', friendshipRequestTypeController.getAll.bind(friendshipRequestTypeController));

    /**
     * Route for retrieving a friendship request type by ID.
     * @name GET /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the friendship request type to retrieve.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createFriendshipRequestTypeRoutes
     */
    router.get('/:id', validateSchema(getByIdSchema), friendshipRequestTypeController.getById.bind(friendshipRequestTypeController));

    /**
     * Route for deleting a friendship request type by ID.
     * @name DELETE /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the friendship request type to delete.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createFriendshipRequestTypeRoutes
     */
    router.delete('/:id', validateSchema(getByIdSchema), friendshipRequestTypeController.delete.bind(friendshipRequestTypeController));

    return router;
}

module.exports = createFriendshipRequestTypeRoutes;
