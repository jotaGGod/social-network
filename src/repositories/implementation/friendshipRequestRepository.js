const db = require('../../database/config/db');
const httpStatus = require('../../utils/statusCodes');
const ApiError = require("../../utils/ApiError");
const { IFriendshipRequestRepository } = require("../interfaces/friendshipRequestAbstract");

class FriendshipRequestRepositoryImplementation extends IFriendshipRequestRepository {
    async create(senderId, receiveId) {
        try {
            await db("friendship_request").insert({
                sender_id: senderId,
                receiver_id: receiveId,
                request_type_id: 1
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating friendship request');
        }
    }

    async getAll(userId) {
        try {
            return await db("friendship_request")
                .where("sender_id", userId)
                .orWhere("receiver_id", userId)
                .select("*");
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting all friendship requests');
        }
    }

    async accept(requestId) {
        try {
            await db("friendship_request")
                .where({ id: requestId })
                .update({
                    request_type_id: 2,
                    updated_at: new Date()
                });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while accepting friendship request');
        }
    }

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
