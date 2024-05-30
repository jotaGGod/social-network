//const { FriendshipRequestType } = require('../../../database/models');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IFriendshipRequestTypeRepository } = require("../interfaces/friendshipRequestTypeAbstract");

class FriendshipRequestTypeRepositoryImplementation extends IFriendshipRequestTypeRepository {
    async create(type) {
        try {
            return await FriendshipRequestType.sequelize.transaction(async (t) => {
                return FriendshipRequestType.create({
                        type: type
                    },
                    { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating friendship request type');
        }
    };
    async getAll(){
        return FriendshipRequestType.findAll(
            { attributes : ['id', 'type'] }
        );
    };
    async getById(id){
        return FriendshipRequestType.findOne(
            {
                where: {id: id},
                attributes: ['id', 'type']
            }
        );
    };
    async delete(id){
        try {
            await FriendshipRequestType.sequelize.transaction(async(t) => {
                await FriendshipRequestType.destroy(
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting friendship request type');
        }
    };
}

module.exports = FriendshipRequestTypeRepositoryImplementation;