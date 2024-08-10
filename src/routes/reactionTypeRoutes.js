const express = require('express');
const validateSchema = require("../middlewares/reactionsTypeValidation");
const { createReactionTypeSchema } = require("../schemas/reactionsTypeSchema");

/**
 * Creates routes for managing reaction types.
 * @function createReactionTypeRoutes
 * @param {Object} reactionTypeController - The controller instance for handling reaction type operations.
 * @returns {express.Router} An Express router with routes for reaction type operations.
 */
function createReactionTypeRoutes(reactionTypeController) {
    const router = express.Router();

    /**
     * Route for creating a new reaction type.
     * @name POST /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {Object} req.body - The request body containing new reaction type details.
     * @middlewares validateSchema - Middleware to validate request body against createReactionTypeSchema.
     * @memberof createReactionTypeRoutes
     */
    router.post('/', validateSchema(createReactionTypeSchema), reactionTypeController.createReactionType.bind(reactionTypeController));

    /**
     * Route for retrieving all reaction types.
     * @name GET /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @memberof createReactionTypeRoutes
     */
    router.get('/', reactionTypeController.getReactionsType.bind(reactionTypeController));

    /**
     * Route for deleting a reaction type by ID.
     * @name DELETE /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the reaction type to delete.
     * @memberof createReactionTypeRoutes
     */
    router.delete('/:id', reactionTypeController.deleteReactionType.bind(reactionTypeController));

    return router;
}

module.exports = createReactionTypeRoutes;
