const express = require('express');
const validateSchema  = require('../middlewares/albumValidation');
const { createAlbumSchema, updateAlbumSchema, getByIdSchema, authorizationSchema } = require('../schemas/albumSchema');

/**
 * Creates routes for managing albums.
 * @function createAlbumRoutes
 * @param {Object} albumController - The controller instance for handling album operations.
 * @returns {Object} An Express router with routes for album operations.
 */
function createAlbumRoutes(albumController) {
    const router = express.Router();

    /**
     * Route for creating a new album.
     * @name POST /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @middlewares validateSchema - Middleware to validate request body against createAlbumSchema.
     * @memberof createAlbumRoutes
     */
    router.post('/', validateSchema(createAlbumSchema), albumController.createAlbum.bind(albumController));

    /**
     * Route for retrieving all albums.
     * @name GET /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @middlewares validateSchema - Middleware to validate request headers against authorizationSchema.
     * @memberof createAlbumRoutes
     */
    router.get('/', validateSchema(authorizationSchema), albumController.getAlbums.bind(albumController));

    /**
     * Route for retrieving an album by ID.
     * @name GET /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the album to retrieve.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createAlbumRoutes
     */
    router.get('/:id', validateSchema(getByIdSchema), albumController.getAlbumById.bind(albumController));

    /**
     * Route for updating an album by ID.
     * @name PUT /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the album to update.
     * @param {Object} req.body - The updated album data.
     * @middlewares validateSchema - Middleware to validate request body against updateAlbumSchema.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createAlbumRoutes
     */
    router.put('/:id', validateSchema(updateAlbumSchema), albumController.updateAlbum.bind(albumController));

    /**
     * Route for deleting an album by ID.
     * @name DELETE /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the album to delete.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createAlbumRoutes
     */
    router.delete('/:id', validateSchema(getByIdSchema), albumController.deleteAlbum.bind(albumController));

    return router;
}

module.exports = createAlbumRoutes;
