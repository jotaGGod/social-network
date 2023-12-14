const yup = require('yup');

const createReactionsSchema = yup.object({
    user_id: yup.number().integer().required(),
    reactions_type_id: yup.number().integer().required(),
    post_id: yup.number().integer().required()
});

const updateReactionsSchema = yup.object({
    id: yup.number().integer().required(),
    user_id: yup.number().integer().required(),
    reactions_type_id: yup.number().integer().required(),
    post_id: yup.number().integer().required()
});

const getByidSchema = yup.object({
    id: yup.number().integer().required()
});

module.exports = {
    createReactionsSchema,
    updateReactionsSchema,
    getByidSchema
};
