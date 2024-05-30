//const { FriendshipRequest, sequelize } = require('../../../database/models');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IFriendshipRequestRepository } = require("../interfaces/friendshipRequestAbstract");
const { QueryTypes } = require("sequelize");

class FriendshipRequestRepositoryImplementation extends IFriendshipRequestRepository {
    async create(senderId, receiveId) {
        try {
            return await FriendshipRequest.sequelize.transaction(async (t) => {
                return FriendshipRequest.create({
                        sender_id: senderId,
                        receiver_id: receiveId,
                        request_type_id: 1
                    },
                    { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating friendship request');
        }
    };
    async getAll(userId){
        return sequelize.query(
            `SELECT * FROM friendship_request WHERE sender_id = ${userId} OR receiver_id = ${userId}`,
            {
                replacements: { userId: userId },
                type: QueryTypes.SELECT,
            }
        );
    };
    async accept(requestId){
        try {
            await FriendshipRequest.sequelize.transaction(async(t) => {
                await FriendshipRequest.update(
                    { request_type_id: 2 },
                    { where: { id: requestId }, transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while updating friendship request');
        }
    };
    async delete(requestId){
        try {
            await FriendshipRequest.sequelize.transaction(async(t) => {
                await FriendshipRequest.destroy(
                    {
                        where: {id: requestId},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting friendship request');
        }
    };
}

module.exports = FriendshipRequestRepositoryImplementation;
