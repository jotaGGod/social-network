const yup = require('yup');
const reactionSchema = yup.object({
    description: yup.string().required(),
    user_id: yup.number().integer().required(),
    post_id: yup.number().integer().required()
});

module.exports =  reactionSchema;