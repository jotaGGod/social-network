const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { ITargetPublicRepository } = require("../interfaces/targetPublicRepositoryAbstract");

class TargetPublicRepositoryImplementation extends ITargetPublicRepository {
    async create(type) {
        try {
            const [target] = await db.transaction(async (trx) => {
                return db('target_public')
                    .transacting(trx)
                    .insert({ type });
            });
            return target;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating target public');
        }
    };

    async getAll(){
        return db('target_public')
            .select('id', 'type', 'is_active');
    };

    async getById(id){
        return db('target_public')
            .where({ id })
            .select('id', 'type', 'is_active')
            .first();
    };

    async delete(id) {
        try {
            await db.transaction(async (trx) => {
                await db('target_public')
                    .where({ id })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting a target public');
        }
    };
}

module.exports = TargetPublicRepositoryImplementation;
