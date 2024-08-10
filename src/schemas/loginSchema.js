const yup = require('yup');

/**
 * Schema for user login validation.
 * @typedef {Object} UserLoginSchema
 * @property {string} email - The user's email address. Must be a valid email format.
 * @property {string} password - The user's password.
 */
const userLoginSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required')
});

module.exports = userLoginSchema;
