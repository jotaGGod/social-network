const ReactionsType = require('../models/reactions_type');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class Repository {
    async create(description) {
        try {
            return Sequelize.transaction(async (t) => {
                return ReactionsType.create(
                    {description},
                    { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating reaction type');
        }
    };
    async getAll(){
        return await ReactionsType.findAll();
    };
    async delete (id) {
        try {
            return Sequelize.transaction(async (t) => {
                return ReactionsType.findOne(
                    {id},
                    { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.NOT_FOUND,'Reaction type not found!!');
        }
    };
}

module.exports = new Repository();
