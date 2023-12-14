const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const validate = (schema) => async (req, res, next) => {
    try {
        const { principal_user_id, friend_id } = req.body;
        const { id } = req.params;
        await schema.validate({
            id,
            principal_user_id,
            friend_id
        })
        next();
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = validate;
