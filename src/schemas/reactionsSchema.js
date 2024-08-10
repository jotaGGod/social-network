const yup = require('yup');

/**
 * Schema for creating a new reaction.
 * @typedef {Object} CreateReactionsSchema
 * @property {string} authorization - The authorization token.
 * @property {number} reaction_type_id - The ID of the reaction type.
 * @property {number} post_id - The ID of the post the reaction is associated with.
 */
const createReactionsSchema = yup.object({
    authorization: yup.string().required('Authorization is required'),
    reaction_type_id: yup.number().integer().required('Reaction type ID is required'),
    post_id: yup.number().integer().required('Post ID is required')
});

/**
 * Schema for getting a reaction by its ID.
 * @typedef {Object} GetByIdSchema
 * @property {number} id - The ID of the reaction to retrieve.
 */
const getByIdSchema = yup.object({
    id: yup.number().integer().required('Reaction ID is required')
});

/**
 * Schema for authorization.
 * @typedef {Object} AuthorizationSchema
 * @property {string} authorization - The authorization token.
 */
const authorizationSchema = yup.object().shape({
    authorization: yup.string().required('Authorization is required')
});

/**
 * Schema for updating a reaction with authorization.
 * @typedef {Object} UpdateReactionsSchemaAuthorization
 * @property {number} id - The ID of the reaction to update.
 * @property {string} authorization - The authorization token.
 */
const updateReactionsSchemaAuthorization = yup.object().shape({
    id: yup.number().integer().required('Reaction ID is required'),
    authorization: yup.string().required('Authorization is required')
});

module.exports = {
    createReactionsSchema,
    updateReactionsSchemaAuthorization,
    getByIdSchema,
    authorizationSchema
};
