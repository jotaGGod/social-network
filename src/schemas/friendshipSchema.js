const yup = require('yup');

const getByidSchema = yup.object({
    id: yup.number().integer().required()
});

const authorizationSchema = yup.object().shape({
    authorization: yup.string().required()
});

module.exports = {
    getByidSchema,
    authorizationSchema
};