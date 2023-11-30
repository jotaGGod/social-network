const Reactions = require('../models/reactions');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class Repository {
    async create(user_id, reactions_type_id, post_id) {
        try {
            return Sequelize.transaction(async (t) => {
                return Reactions.create(
                    {
                        user_id: user_id,
                        reactions_type_id: reactions_type_id,
                        post_id: post_id
                    }, { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating reaction');
        }
    };
    async getById(id){
        return Reactions.findOne(
            {
                where: { id: id },
                attributes: ['id', 'user_id', 'reactions_type_id', 'post_id', 'is_active']
            }
        );
    };
    async getAll(){
        return Reactions.findAll(
            { attributes: ['id', 'user_id', 'reactions_type_id', 'post_id', 'is_active'] }
        );
    };
    async update(id, user_id, reactions_type_id, post_id) {
        try {
            return Sequelize.transaction(async (t) => {
                return Reactions.update(
                    {
                        user_id: user_id,
                        reactions_type_id: reactions_type_id,
                        post_id: post_id
                    },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating reaction');
        }
    };
    async delete (id) {
        try {
            return Sequelize.transaction(async(t) => {
                return Reactions.update(
                    { is_active: false },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting reaction');
        }
    };
}

module.exports = new Repository();
