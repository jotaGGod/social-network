const yup = require('yup');

const createPostSchema = yup.object({
    description: yup.string(),
    user_id: yup.number().integer().required(),
    target_id: yup.number().integer().required(),
    type_id: yup.number().integer().required()
});

const updatePostSchema = yup.object({
    id: yup.number().integer().required(),
    description: yup.string(),
    user_id: yup.number().integer().required(),
    target_id: yup.number().integer().required(),
    type_id: yup.number().integer().required()
});

const getByIdSchema = yup.object({
    id: yup.number().integer().required()
});

module.exports = {
    createPostSchema,
    updatePostSchema,
    getByIdSchema
};