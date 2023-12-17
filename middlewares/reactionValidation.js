const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const validateSchema = (schema) => async (req, res, next) => {
    try {
        const { user_id, reactions_type_id, post_id } = req.body;
        const { id } = req.params;
        await schema.validate({
            id,
            user_id,
            reactions_type_id,
            post_id
        })
        next();
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = validateSchema;