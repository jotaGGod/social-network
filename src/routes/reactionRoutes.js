const express = require('express');
const validateSchema  = require('../middlewares/reactionValidation');
const { createReactionsSchema, getByIdSchema, authorizationSchema, updateReactionsSchemaAuthorization } = require('../schemas/reactionsSchema');

/**
 * Creates routes for managing reactions.
 * @function createReactionRoutes
 * @param {Object} reactionController - The controller instance for handling reaction operations.
 * @returns {express.Router} An Express router with routes for reaction operations.
 */
function createReactionRoutes(reactionController) {
    const router = express.Router();

    /**
     * Route for retrieving all reactions.
     * @name GET /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @middlewares validateSchema - Middleware to validate request headers and/or query parameters against authorizationSchema.
     * @memberof createReactionRoutes
     */
    router.get('/', validateSchema(authorizationSchema), reactionController.getReactions.bind(reactionController));

    /**
     * Route for creating a new reaction.
     * @name POST /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {Object} req.body - The request body containing reaction details.
     * @middlewares validateSchema - Middleware to validate request body against createReactionsSchema.
     * @memberof createReactionRoutes
     */
    router.post('/', validateSchema(createReactionsSchema), reactionController.createReaction.bind(reactionController));

    /**
     * Route for retrieving a reaction by ID.
     * @name GET /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the reaction to retrieve.
     * @middlewares validateSchema - Middleware to validate request parameters against authorizationSchema.
     * @memberof createReactionRoutes
     */
    router.get('/:id', validateSchema(authorizationSchema), reactionController.getReactionById.bind(reactionController));

    /**
     * Route for updating a reaction by ID.
     * @name PUT /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the reaction to update.
     * @param {Object} req.body - The request body containing updated reaction details.
     * @middlewares validateSchema - Middleware to validate request body against updateReactionsSchemaAuthorization.
     * @memberof createReactionRoutes
     */
    router.put('/:id', validateSchema(updateReactionsSchemaAuthorization), reactionController.updateReaction.bind(reactionController));

    /**
     * Route for deleting a reaction by ID.
     * @name DELETE /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the reaction to delete.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createReactionRoutes
     */
    router.delete('/:id', validateSchema(getByIdSchema), reactionController.deleteReaction.bind(reactionController));

    return router;
}

module.exports = createReactionRoutes;
