const TargetPublic = require('../models/target_public');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class Repository {
    async create(type) {
        try {
            return Sequelize.transaction(async (t) => {
                return TargetPublic.create(
                    {type},
                    { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating target public');
        }
    };
    async getAll(){
        return await TargetPublic.findAll();
    };
    async delete (id) {
        try {
            return Sequelize.transaction(async (t) => {
                return TargetPublic.findOne(
                    {id},
                    { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.NOT_FOUND,'Target public not found!!');
        }
    };
}

module.exports = new Repository();
