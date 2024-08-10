const express = require('express');
const validateSchema = require('../middlewares/friendshipRequestValidation');
const { createFriendshipRequestSchema,
    seeAllFriendshipRequestsSchema,
    acceptFriendshipRequestSchema,
    rejectFriendshipRequestSchema } = require('../schemas/friendshipRequestSchema');

/**
 * Creates routes for managing friendship requests.
 * @function createFriendshipRequestRoutes
 * @param {Object} friendshipRequestController - The controller instance for handling friendship request operations.
 * @returns {Object} An Express router with routes for friendship request operations.
 */
function createFriendshipRequestRoutes(friendshipRequestController) {
    const router = express.Router();

    /**
     * Route for sending a new friendship request.
     * @name POST /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @middlewares validateSchema - Middleware to validate request body against createFriendshipRequestSchema.
     * @memberof createFriendshipRequestRoutes
     */
    router.post('/', validateSchema(createFriendshipRequestSchema), friendshipRequestController.sendFriendshipRequest.bind(friendshipRequestController));

    /**
     * Route for retrieving all friendship requests.
     * @name GET /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @middlewares validateSchema - Middleware to validate request query against seeAllFriendshipRequestsSchema.
     * @memberof createFriendshipRequestRoutes
     */
    router.get('/', validateSchema(seeAllFriendshipRequestsSchema), friendshipRequestController.getAllFriendshipRequests.bind(friendshipRequestController));

    /**
     * Route for accepting a friendship request by ID.
     * @name PUT /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the friendship request to accept.
     * @middlewares validateSchema - Middleware to validate request parameters against acceptFriendshipRequestSchema.
     * @memberof createFriendshipRequestRoutes
     */
    router.put('/:id', validateSchema(acceptFriendshipRequestSchema), friendshipRequestController.acceptFriendshipRequest.bind(friendshipRequestController));

    /**
     * Route for rejecting a friendship request by ID.
     * @name DELETE /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the friendship request to reject.
     * @middlewares validateSchema - Middleware to validate request parameters against rejectFriendshipRequestSchema.
     * @memberof createFriendshipRequestRoutes
     */
    router.delete('/:id', validateSchema(rejectFriendshipRequestSchema), friendshipRequestController.rejectFriendshipRequest.bind(friendshipRequestController));

    return router;
}

module.exports = createFriendshipRequestRoutes;
