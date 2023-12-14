const yup = require('yup');

const createCommentSchema = yup.object({
    description: yup.string().required(),
    user_id: yup.number().integer().required(),
    post_id: yup.number().integer().required()
});

const updateCommentSchema = yup.object({
    id: yup.number().integer().required(),
    description: yup.string().required(),
    user_id: yup.number().integer().required(),
    post_id: yup.number().integer().required()
});

const getByIdSchema = yup.object({
    id: yup.number().integer().required()
});

module.exports = {
    createCommentSchema,
    updateCommentSchema,
    getByIdSchema
};