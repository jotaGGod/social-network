const Friendship = require('../models/friendship');
const httpStatus = require('../utils/statusCodes');

class Validations {

    validation = (schema) => async (req, res, next) => {
        const {
            principal_user_id, friend_id
        } = req.body;
        await schema.validate({
            principal_user_id,
            friend_id
        })
        next();
    };
}

module.exports = new Validations();