const yup = require('yup');

/**
 * Schema for user validation.
 * @typedef {Object} UserSchema
 * @property {string} id - The unique identifier for the user.
 */
const userSchema = yup.object({
    id: yup.string().required('User ID is required')
});

module.exports = userSchema;
