// const { TargetPublic } = require('../../../database/models');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { ITargetPublicRepository } = require("../interfaces/targetPublicRepositoryAbstract");

class TargetPublicRepositoryImplementation extends ITargetPublicRepository {
    async create(type) {
        try {
            return await TargetPublic.sequelize.transaction(async (t) => {
                return TargetPublic.create(
                    { type },
                    { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating target public');
        }
    };
    async getAll(){
        return TargetPublic.findAll(
            { attributes: ['id', 'type', 'is_active'] }
        );
    };
    async getById(id){
        return TargetPublic.findOne(
            {
                where: {id: id},
                attributes: ['id', 'type', 'is_active']
            }
        );
    };
    async delete(id) {
        try {
            await TargetPublic.sequelize.transaction(async (t) => {
                await TargetPublic.update(
                    { is_active: false },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting a target public');
        }
    };
}

module.exports = TargetPublicRepositoryImplementation;
