const yup = require('yup');
const friendshipSchema = yup.object({
    principal_user_id: yup.number().integer().required(),
    friend_id: yup.number().integer().required()
});

module.exports =  friendshipSchema;