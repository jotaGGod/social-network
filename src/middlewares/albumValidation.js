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
        const { description, target_id: targetId } = req.body;
        const { authorization } = req.headers;
        const { id: albumId } = req.params;

        // Validate the data using the provided schema
        await schema.validate({
            album_id: albumId,
            authorization: authorization,
            description: description,
            target_id: targetId
        });

        // If validation is successful, proceed to the next middleware
        next();
    } catch (error) {
        // If there is a validation error, throw an ApiError with BAD_REQUEST status
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
}

module.exports = validateSchema;
