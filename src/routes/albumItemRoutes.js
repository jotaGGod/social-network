const express = require('express');
const validateSchema = require("../middlewares/albumItemValidation");
const { createAlbumItemSchema, getByIdSchema, authorizationSchema } = require("../schemas/albumItemSchema");

/**
 * Creates routes for managing album items.
 * @function createAlbumItemRoutes
 * @param {Object} albumItemController - The controller instance for handling album item operations.
 * @returns {Object} An Express router with routes for album item operations.
 */
function createAlbumItemRoutes(albumItemController) {
    const router = express.Router();

    /**
     * Route for creating a new album item.
     * @name POST /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @middlewares validateSchema - Middleware to validate request body against createAlbumItemSchema.
     * @memberof createAlbumItemRoutes
     */
    router.post('/', validateSchema(createAlbumItemSchema), albumItemController.createAlbumItem.bind(albumItemController));

    /**
     * Route for retrieving all album items.
     * @name GET /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @middlewares validateSchema - Middleware to validate request headers against authorizationSchema.
     * @memberof createAlbumItemRoutes
     */
    router.get('/', validateSchema(authorizationSchema), albumItemController.getAlbumItems.bind(albumItemController));

    /**
     * Route for deleting an album item by ID.
     * @name DELETE /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the album item to delete.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createAlbumItemRoutes
     */
    router.delete('/:id', validateSchema(getByIdSchema), albumItemController.deleteAlbumItem.bind(albumItemController));

    return router;
}

module.exports = createAlbumItemRoutes;
