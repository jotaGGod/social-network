//const { Friendship, Sequelize, sequelize} = require('../../../database/models');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IFriendshipRepository } = require("../interfaces/friendshipRepositoryAbstract");
const { QueryTypes } = require("sequelize");

class FriendshipRepositoryImplementation extends IFriendshipRepository{
    async create(principal_user_id, friend_id) {
        try {
            return await Friendship.sequelize.transaction(async (t) => {
                return Friendship.create({
                        principal_user_id: principal_user_id,
                        friend_id: friend_id,
                        is_active: true
                    },
                    { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating friendship');
        }
    };
    async getAll(userId){
        return sequelize.query(
            `SELECT * FROM friendship WHERE principal_user_id = ${userId} OR friend_id = ${userId} AND is_active = true`,
            {
                replacements: { userId: userId },
                type: QueryTypes.SELECT,
            }
        );
    };
    async getById(id){
        return Friendship.findOne(
            {
                where: {id: id},
                attributes: ['id', 'principal_user_id', 'friend_id', 'is_active']
            }
        );
    };
    async delete(id){
        try {
            await Friendship.sequelize.transaction(async(t) => {
                await Friendship.update(
                    { is_active: false },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting friendship');
        }
    };
}

module.exports = FriendshipRepositoryImplementation;
