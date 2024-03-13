const { Friendship } = require('../../database/models');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IFriendshipRepository } = require("../interfaces/friendshipRepositoryAbstract");

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
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
        }
    };
    async getAll(){
        return Friendship.findAll(
            { attributes : ['id', 'principal_user_id', 'friend_id', 'is_active'] }
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
