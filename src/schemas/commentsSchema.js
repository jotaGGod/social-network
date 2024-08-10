const yup = require('yup');

/**
 * Schema for creating a comment.
 * @typedef {Object} CreateCommentSchema
 * @property {string} description - The text of the comment.
 * @property {number} post_id - The ID of the post to which the comment belongs.
 */
const createCommentSchema = yup.object({
    description: yup.string().required('Description is required'),
    post_id: yup.number().integer().required('Post ID is required')
});

/**
 * Schema for updating a comment.
 * @typedef {Object} UpdateCommentSchema
 * @property {number} id - The ID of the comment to update.
 * @property {string} description - The updated text of the comment.
 */
const updateCommentSchema = yup.object({
    id: yup.number().integer().required('Comment ID is required'),
    description: yup.string().required('Description is required')
});

/**
 * Schema for retrieving a comment by ID.
 * @typedef {Object} GetByIdSchema
 * @property {number} id - The ID of the comment to retrieve.
 * @property {string} authorization - The authorization token.
 */
const getByIdSchema = yup.object({
    id: yup.number().integer().required('Comment ID is required'),
    authorization: yup.string().required('Authorization is required')
});

/**
 * Schema for authorization header.
 * @typedef {Object} AuthorizationSchema
 * @property {string} authorization - The authorization token.
 */
const authorizationSchema = yup.object().shape({
    authorization: yup.string().required('Authorization is required')
});

module.exports = {
    createCommentSchema,
    updateCommentSchema,
    getByIdSchema,
    authorizationSchema
};
