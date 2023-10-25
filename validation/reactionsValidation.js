const yup = require('yup');
const reactionSchema = yup.object({
    user_id: yup.number().integer().required(),
    reactions_type_id: yup.number().integer().required(),
    post_id: yup.number().integer().required()
});

module.exports =  reactionSchema;
