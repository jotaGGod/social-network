const Album = require('../models/album');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class Repository {
    async create(description, target_id) {
        try {
            return Sequelize.transaction(async (t) => {
                return Album.findOne({
                    description: description,
                    target_id: target_id
                    },
                    { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating a new album');
        }
    };
    async getById(id){
        return Album.findOne({
        where: {id: id},
        attributes: ['id', 'description', 'target_id', 'is_active']
    });
    };
    async getAll(){
        return Album.findAll({ attributes: ['id', 'description', 'target_id', 'is_active'] });
    };
    async update(id, description, target_id) {
        try {
            return Sequelize.transaction(async (t) => {
                return Album.update(
                    { description: description, target_id: target_id },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating album');
        }
    };
    async delete (id) {
        try {
            return Sequelize.transaction(async (t) => {
                return await Album.update(
                    { is_active: false },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting album');
        }
    };
}

module.exports = new Repository();
