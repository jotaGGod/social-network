const express = require('express');

/**
 * Creates routes for managing target public entities.
 * @function createTargetPublicRoutes
 * @param {Object} targetPublicController - The controller instance for handling target public operations.
 * @returns {express.Router} An Express router with routes for target public operations.
 */
function createTargetPublicRoutes(targetPublicController) {
    const router = express.Router();

    /**
     * Route for creating a new target public entity.
     * @name POST /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {Object} req.body - The request body containing target public details.
     * @memberof createTargetPublicRoutes
     */
    router.post('/', targetPublicController.createTargetPublic.bind(targetPublicController));

    /**
     * Route for retrieving all target public entities.
     * @name GET /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @memberof createTargetPublicRoutes
     */
    router.get('/', targetPublicController.getTargetPublic.bind(targetPublicController));

    /**
     * Route for deleting a target public entity by ID.
     * @name DELETE /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the target public entity to delete.
     * @memberof createTargetPublicRoutes
     */
    router.delete('/:id', targetPublicController.deleteTargetPublic.bind(targetPublicController));

    return router;
}

module.exports = createTargetPublicRoutes;
