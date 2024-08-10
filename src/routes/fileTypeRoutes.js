const express = require('express');
const validateSchema = require("../middlewares/fileTypeValidation");
const { createFileTypeSchema, getByIdSchema } = require("../schemas/fileTypeSchema");

/**
 * Creates routes for managing file types.
 * @function createFileTypeRoutes
 * @param {Object} fileTypeController - The controller instance for handling file type operations.
 * @returns {Object} An Express router with routes for file type operations.
 */
function createFileTypeRoutes(fileTypeController) {
    const router = express.Router();

    /**
     * Route for creating a new file type.
     * @name POST /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @middlewares validateSchema - Middleware to validate request body against createFileTypeSchema.
     * @memberof createFileTypeRoutes
     */
    router.post('/', validateSchema(createFileTypeSchema), fileTypeController.createFileType.bind(fileTypeController));

    /**
     * Route for retrieving all file types.
     * @name GET /
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @memberof createFileTypeRoutes
     */
    router.get('/', fileTypeController.getFileTypes.bind(fileTypeController));

    /**
     * Route for deleting a file type by ID.
     * @name DELETE /:id
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @param {string} req.params.id - The ID of the file type to delete.
     * @middlewares validateSchema - Middleware to validate request parameters against getByIdSchema.
     * @memberof createFileTypeRoutes
     */
    router.delete('/:id', validateSchema(getByIdSchema), fileTypeController.deleteFileType.bind(fileTypeController));

    return router;
}

module.exports = createFileTypeRoutes;
