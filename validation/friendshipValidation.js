const yup = require('yup');

const createFriendshipSchema = yup.object({
    principal_user_id: yup.number().integer().required(),
    friend_id: yup.number().integer().required()
});

const getByidSchema = yup.object({
    id: yup.number().integer().required()
});

module.exports = {
    createFriendshipSchema,
    getByidSchema
};