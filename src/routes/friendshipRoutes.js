const express = require('express');
const validateSchema = require('../middlewares/friendshipValidation');
const { getByIdSchema, authorizationSchema } = require('../schemas/friendshipSchema');

/**
 * Creates routes for managing friendships.
 * @function createFriendshipRoutes
 * @param {Object} friendshipController - The controller instance for handling friendship operations.
 * @returns {Object} An Express router with routes for friendship operations.
 */
function createFriendshipRoutes(friendshipController) {
    const router = express.Router();

    /**
     * Route for retrieving all friendships.
     * @name GET /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @middlewares validateSchema - Middleware to validate request headers and/or query parameters against authorizationSchema.
     * @memberof createFriendshipRoutes
     */
    router.get('/', validateSchema(authorizationSchema), friendshipController.getFriendships.bind(friendshipController));

    /**
     * Route for deleting a friendship by ID.
     * @name DELETE /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the friendship to delete.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createFriendshipRoutes
     */
    router.delete('/:id', validateSchema(getByIdSchema), friendshipController.deleteFriendship.bind(friendshipController));

    return router;
}

module.exports = createFriendshipRoutes;
