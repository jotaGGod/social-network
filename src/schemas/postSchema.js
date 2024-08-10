const yup = require('yup');

/**
 * Schema for creating a new post.
 * @typedef {Object} CreatePostSchema
 * @property {string} authorization - The authorization token.
 * @property {string} [description] - The description of the post.
 * @property {number} target_id - The ID of the target related to the post.
 * @property {number} type_id - The ID of the type of the post.
 */
const createPostSchema = yup.object({
    authorization: yup.string().required('Authorization is required'),
    description: yup.string(),
    target_id: yup.number().integer().required('Target ID is required'),
    type_id: yup.number().integer().required('Type ID is required')
});

/**
 * Schema for updating an existing post.
 * @typedef {Object} UpdatePostSchema
 * @property {number} id - The ID of the post to update.
 * @property {string} [description] - The updated description of the post.
 * @property {number} user_id - The ID of the user updating the post.
 * @property {number} target_id - The ID of the target related to the post.
 * @property {number} type_id - The ID of the type of the post.
 */
const updatePostSchema = yup.object({
    id: yup.number().integer().required('Post ID is required'),
    description: yup.string(),
    user_id: yup.number().integer().required('User ID is required'),
    target_id: yup.number().integer().required('Target ID is required'),
    type_id: yup.number().integer().required('Type ID is required')
});

/**
 * Schema for authorization.
 * @typedef {Object} AuthorizationSchema
 * @property {string} authorization - The authorization token.
 */
const authorizationSchema = yup.object({
    authorization: yup.string().required('Authorization is required')
});

/**
 * Schema for getting a post by its ID.
 * @typedef {Object} GetByIdSchema
 * @property {number} id - The ID of the post to retrieve.
 * @property {string} authorization - The authorization token.
 */
const getByIdSchema = yup.object({
    id: yup.number().integer().required('Post ID is required'),
    authorization: yup.string().required('Authorization is required')
});

module.exports = {
    createPostSchema,
    updatePostSchema,
    getByIdSchema,
    authorizationSchema
};
