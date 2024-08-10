const yup = require('yup');

/**
 * Schema for creating a file type.
 * @typedef {Object} CreateFileTypeSchema
 * @property {string} type - The type of the file.
 */
const createFileTypeSchema = yup.object({
    type: yup.string().required('File type is required')
});

/**
 * Schema for retrieving a file type by ID.
 * @typedef {Object} GetByIdSchema
 * @property {number} id - The ID of the file type to retrieve.
 */
const getByIdSchema = yup.object({
    id: yup.number().integer().required('File type ID is required')
});

module.exports = {
    createFileTypeSchema,
    getByIdSchema
};
