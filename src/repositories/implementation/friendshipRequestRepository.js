const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const { IFriendshipRequestRepository } = require("../interfaces/friendshipRequestAbstract");
const friendshipRequestTypeStatus = require("../../utils/friendshipRequestTypeStatus");
const httpStatus = require('../../utils/statusCodes');

/**
 * Implementation of the friendship request repository.
 *
 * This class provides the implementation of the methods defined in the `IFriendshipRequestRepository` interface for managing friendship requests in the database.
 */
class FriendshipRequestRepositoryImplementation extends IFriendshipRequestRepository {

    /**
     * Creates a new friendship request.
     *
     * @param {number} senderId - The ID of the user sending the request.
     * @param {number} receiverId - The ID of the user receiving the request.
     * @returns {Promise<void>} - Returns a Promise that resolves when the operation is complete.
     * @throws {ApiError} - Throws an internal server error if creation fails.
     */
    async create(senderId, receiverId) {
        try {
            await db("friendship_request").insert({
                sender_id: senderId,
                receiver_id: receiverId,
                request_type_id: friendshipRequestTypeStatus.AWAITING_APPROVAL
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating friendship request');
        }
    }

    /**
     * Retrieves all friendship requests for a user.
     *
     * @param {number} userId - The ID of the user whose friendship requests are to be retrieved.
     * @returns {Promise<Array<Object>>} - A list of all friendship requests for the user.
     * @throws {ApiError} - Throws an internal server error if retrieval fails.
     */
    async getAll(userId) {
        try {
            return db("friendship_request")
                .where("sender_id", userId)
                .orWhere("receiver_id", userId)
                .select("*");
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting all friendship requests');
        }
    }

    /**
     * Accepts a friendship request.
     *
     * @param {number} requestId - The ID of the friendship request to be accepted.
     * @returns {Promise<void>} - Returns a Promise that resolves when the operation is complete.
     * @throws {ApiError} - Throws an internal server error if acceptance fails.
     */
    async accept(requestId) {
        try {
            await db("friendship_request")
                .where({ id: requestId })
                .update({
                    request_type_id: friendshipRequestTypeStatus.ACCEPTED,
                    updated_at: new Date()
                });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while accepting friendship request');
        }
    }

    /**
     * Deletes a friendship request.
     *
     * @param {number} requestId - The ID of the friendship request to be deleted.
     * @returns {Promise<void>} - Returns a Promise that resolves when the operation is complete.
     * @throws {ApiError} - Throws an internal server error if deletion fails.
     */
    async delete(requestId) {
        try {
            await db("friendship_request")
                .where({ id: requestId })
                .del();
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while deleting friendship request');
        }
    }
}

module.exports = FriendshipRequestRepositoryImplementation;
