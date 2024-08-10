const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Middleware for schema validation.
 *
 * This middleware applies a validation schema to the request data. If validation fails, an error is thrown. Otherwise, control is passed to the next middleware.
 *
 * @param {Object} schema - The validation schema to be applied. Must have a `validate` method that takes a data object for validation.
 * @returns {Function} - The middleware function that performs schema validation.
 */
const validateSchema = (schema) => async (req, res, next) => {
    try {
        // Extract data from the request
        const { reaction_type_id: reactionTypeId, post_id: postId } = req.body;
        const { authorization } = req.headers;
        const { id } = req.params;

        // Validate the data with the provided schema
        await schema.validate({
            id,
            authorization,
            reaction_type_id: reactionTypeId,
            post_id: postId
        });

        // Pass control to the next middleware if validation is successful
        next();
    } catch (error) {
        // Throw an error with BAD_REQUEST status if validation fails
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

module.exports = validateSchema;
