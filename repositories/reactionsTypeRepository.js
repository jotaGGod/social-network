const ReactionsType = require('../models/reactions_type');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const User = require("../models/users");

class Repository {
    async create(description) {
        try {
            return Sequelize.transaction(async (t) => {
                return ReactionsType.create(
                    { description },
                    { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating reaction type');
        }
    };
    async getById(id){
        return ReactionsType.findOne(
            {
                where: { id: id },
                attributes: ['id', 'description', 'is_active']
            }
        );
    };
    async getAll(){
        return ReactionsType.findAll(
            { attributes: ['id', 'description', 'is_active'] }
        );
    };
    async delete (id) {
        try {
            return Sequelize.transaction(async (t) => {
                return ReactionsType.update(
                    { is_active: false },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting reaction type');
        }
    };
}

module.exports = new Repository();
