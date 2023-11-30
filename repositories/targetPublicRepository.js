const TargetPublic = require('../models/target_public');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class Repository {
    async create(type) {
        try {
            return Sequelize.transaction(async (t) => {
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
            return Sequelize.transaction(async (t) => {
                return TargetPublic.update(
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

module.exports = new Repository();
