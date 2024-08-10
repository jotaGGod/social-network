const yup = require('yup');

/**
 * Schema for creating a friendship request type.
 * @typedef {Object} CreateFriendshipRequestTypeSchema
 * @property {string} type - The type of the friendship request.
 */
const createFriendshipRequestTypeSchema = yup.object({
    type: yup.string().required('Type is required')
});

/**
 * Schema for retrieving a friendship request type by ID.
 * @typedef {Object} GetByIdSchema
 * @property {number} id - The ID of the friendship request type.
 */
const getByIdSchema = yup.object({
    id: yup.number().integer().required('ID is required')
});

module.exports = {
    createFriendshipRequestTypeSchema,
    getByIdSchema
};
