const yup = require('yup');

/**
 * Schema for retrieving an item by ID with authorization.
 * @typedef {Object} GetByIdSchema
 * @property {string} authorization - The authorization token.
 * @property {number} id - The ID of the item.
 */
const getByIdSchema = yup.object({
    authorization: yup.string().required('Authorization is required'),
    id: yup.number().integer().required('ID is required')
});

/**
 * Schema for authorization.
 * @typedef {Object} AuthorizationSchema
 * @property {string} authorization - The authorization token.
 */
const authorizationSchema = yup.object().shape({
    authorization: yup.string().required('Authorization is required')
});

module.exports = {
    getByIdSchema,
    authorizationSchema
};
