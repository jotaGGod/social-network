const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Middleware for schema validation.
 *
 * This middleware is responsible for validating the request data against the provided schema.
 * If validation fails, an error is thrown. Otherwise, the request is passed to the next middleware.
 *
 * @param {Object} schema - The validation schema to be applied. It should have a `validate` method that accepts a data object for validation.
 * @returns {Function} - The middleware function that performs schema validation.
 */
const validateSchema = (schema) => async (req, res, next) => {
    try {
        // Extract data from the request
        const { full_name: fullName, email, password } = req.body;
        const { id } = req.params;
        const { authorization } = req.headers;

        // Validate the data with the provided schema
        await schema.validate({
            authorization,
            id,
            fullName,
            email,
            password
        });

        // Pass control to the next middleware if validation is successful
        next();
    } catch (error) {
        // Throw an error with BAD_REQUEST status if validation fails
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

module.exports = validateSchema;
