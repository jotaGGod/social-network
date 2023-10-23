const yup = require('yup');
const postSchema = yup.object({
    description: yup.string(),
    user_id: yup.number().integer().required(),
    target_id: yup.number().integer().required(),
    type_id: yup.number().integer().required()
});

module.exports =  postSchema;