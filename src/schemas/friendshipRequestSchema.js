const yup = require('yup');

/**
 * Schema for creating a friendship request.
 * @typedef {Object} CreateFriendshipRequestSchema
 * @property {string} authorization - The authorization token for the request.
 * @property {number} receiver_id - The ID of the user receiving the friendship request.
 */
const createFriendshipRequestSchema = yup.object({
    authorization: yup.string().required('Authorization is required'),
    receiver_id: yup.number().integer().required('Receiver ID is required')
});

/**
 * Schema for retrieving all friendship requests.
 * @typedef {Object} SeeAllFriendshipRequestsSchema
 * @property {string} authorization - The authorization token for the request.
 */
const seeAllFriendshipRequestsSchema = yup.object({
    authorization: yup.string().required('Authorization is required')
});

/**
 * Schema for accepting a friendship request.
 * @typedef {Object} AcceptFriendshipRequestSchema
 * @property {string} authorization - The authorization token for the request.
 * @property {number} id - The ID of the friendship request to accept.
 * @property {number} sender_id - The ID of the user who sent the friendship request.
 */
const acceptFriendshipRequestSchema = yup.object({
    authorization: yup.string().required('Authorization is required'),
    id: yup.number().integer().required('Request ID is required'),
    sender_id: yup.number().integer().required('Sender ID is required')
});

/**
 * Schema for rejecting a friendship request.
 * @typedef {Object} RejectFriendshipRequestSchema
 * @property {string} authorization - The authorization token for the request.
 * @property {number} id - The ID of the friendship request to reject.
 */
const rejectFriendshipRequestSchema = yup.object({
    authorization: yup.string().required('Authorization is required'),
    id: yup.number().integer().required('Request ID is required')
});

module.exports = {
    createFriendshipRequestSchema,
    seeAllFriendshipRequestsSchema,
    acceptFriendshipRequestSchema,
    rejectFriendshipRequestSchema
};
