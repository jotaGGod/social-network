const Friendship = require('../models/friendship');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class Repository {
    async createFriendship(principal_user_id, friend_id) {
        try {
            return Sequelize.transaction(async (t) => {
                return Friendship.findOne({
                    principal_user_id: principal_user_id,
                    friend_id: friend_id,
                    is_active: true
                    },
                    { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating a new friendship');
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
            return Sequelize.transaction(async(t) => {
                return Friendship.update(
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

module.exports = new Repository();
