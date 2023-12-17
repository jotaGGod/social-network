const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const validate = (schema) => async (req, res, next) => {
    try {
        const { description, user_id, target_id, type_id } = req.body;
        const { id } = req.params;
        await schema.validate({
            id,
            description,
            user_id,
            target_id,
            type_id
        })
        next();
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = validate;

