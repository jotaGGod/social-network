const yup = require('yup');

/**
 * Schema for creating a new user.
 * @typedef {Object} CreateUserSchema
 * @property {string} full_name - The full name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password for the user account.
 */
const createUserSchema = yup.object().shape({
    full_name: yup.string().required('Full name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required')
});

/**
 * Schema for authorization, typically used in requests where authorization is required.
 * @typedef {Object} AuthorizationSchema
 * @property {string} authorization - The authorization token.
 */
const authorizationSchema = yup.object().shape({
    authorization: yup.string().required('Authorization token is required')
});

/**
 * Schema for updating user information.
 * @typedef {Object} UpdateUserSchema
 * @property {number} [id] - The ID of the user to update (optional).
 * @property {string} [full_name] - The updated full name of the user (optional).
 * @property {string} [email] - The updated email address of the user (optional).
 * @property {string} [password] - The updated password for the user account (optional).
 */
const updateUserSchema = yup.object().shape({
    id: yup.number().integer(),
    full_name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
});

/**
 * Schema for retrieving a user by their ID.
 * @typedef {Object} GetByIdSchema
 * @property {number} id - The ID of the user to retrieve.
 */
const getByIdSchema = yup.object().shape({
    id: yup.number().integer().required('User ID is required'),
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    getByIdSchema,
    authorizationSchema
};
