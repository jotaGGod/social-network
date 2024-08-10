const yup = require('yup');

/**
 * Schema for creating an album.
 * @typedef {Object} CreateAlbumSchema
 * @property {string} description - The description of the album.
 * @property {number} target_id - The ID of the target for the album.
 */
const createAlbumSchema = yup.object({
    description: yup.string().required('Description is required'),
    target_id: yup.number().integer().required('Target ID is required')
});

/**
 * Schema for updating an album.
 * @typedef {Object} UpdateAlbumSchema
 * @property {number} album_id - The ID of the album to update.
 * @property {string} description - The updated description of the album.
 * @property {number} target_id - The updated ID of the target for the album.
 */
const updateAlbumSchema = yup.object({
    album_id: yup.number().integer().required('Album ID is required'),
    description: yup.string().required('Description is required'),
    target_id: yup.number().integer().required('Target ID is required')
});

/**
 * Schema for retrieving an album by ID.
 * @typedef {Object} GetByIdSchema
 * @property {number} album_id - The ID of the album to retrieve.
 */
const getByIdSchema = yup.object({
    album_id: yup.number().integer().required('Album ID is required')
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
    createAlbumSchema,
    updateAlbumSchema,
    getByIdSchema,
    authorizationSchema
};
