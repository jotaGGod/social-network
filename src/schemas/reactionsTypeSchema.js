const yup = require('yup');

/**
 * Schema for creating a new reaction type.
 * @typedef {Object} CreateReactionTypeSchema
 * @property {string} description - The description of the reaction type.
 */
const createReactionTypeSchema = yup.object({
    description: yup.string().required('Description is required')
});

/**
 * Schema for getting a reaction type by its ID.
 * @typedef {Object} GetByIdSchema
 * @property {number} id - The ID of the reaction type to retrieve.
 */
const getByIdSchema = yup.object({
    id: yup.number().integer().required('Reaction type ID is required')
});

module.exports = {
    createReactionTypeSchema,
    getByIdSchema
};
