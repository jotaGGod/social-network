const yup = require('yup');

/**
 * Schema for creating an album item.
 * @typedef {Object} CreateAlbumItemSchema
 * @property {string} authorization - The authorization token.
 * @property {number} post_id - The ID of the post.
 * @property {number} album_id - The ID of the album.
 */
const createAlbumItemSchema = yup.object({
    authorization: yup.string().required('Authorization is required'),
    post_id: yup.number().integer().required('Post ID is required'),
    album_id: yup.number().integer().required('Album ID is required')
});

/**
 * Schema for retrieving an album item by ID.
 * @typedef {Object} GetByIdSchema
 * @property {string} authorization - The authorization token.
 * @property {number} id - The ID of the album item.
 */
const getByIdSchema = yup.object({
    authorization: yup.string().required('Authorization is required'),
    id: yup.number().integer().required('ID is required')
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
    createAlbumItemSchema,
    getByIdSchema,
    authorizationSchema
};
