const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Middleware to validate a data schema.
 *
 * @param {Object} schema - The validation schema to be used.
 * @returns {Function} Middleware for validation.
 */
const validateSchema = (schema) => async (req, res, next) => {
    try {
        // Extract data from request body, headers, and parameters
        const { post_id: postId, album_id: albumId } = req.body;
        const { authorization } = req.headers;
        const { id } = req.params;

        // Validate the data using the provided schema
        await schema.validate({
            id: id,
            authorization: authorization,
            post_id: postId,
            album_id: albumId
        });

        // If validation is successful, proceed to the next middleware
        next();
    } catch (error) {
        // If there is a validation error, throw an ApiError with BAD_REQUEST status
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
}

module.exports = validateSchema;
