const Comments = require('../models/comments');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class Repository {
    async create(description, user_id, post_id) {
        try {
            return Sequelize.transaction(async (t) => {
                return Comments.create(
                    {
                        description: description,
                        user_id: user_id,
                        post_id: post_id
                    }, { transaction: t });
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating comment');
        }
    };
    async getById(id){
        return Comments.findOne(
            {
                where: { id: id },
                attributes: ['id', 'description', 'user_id', 'post_id', 'is_active']
            }
        );
    };
    async getAll(){
        return Comments.findAll(
            { attributes: ['id', 'description', 'user_id', 'post_id', 'is_active'] }
        )
    };

    async update(id, description, user_id, post_id) {
        try {
            return Sequelize.transaction(async (t) => {
                return Comments.update(
                    {
                        description: description,
                        user_id: user_id,
                        post_id: post_id
                    },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating comment');
        }
    };
    async delete (id) {
        try {
            return Sequelize.transaction(async (t) => {
                return Comments.update(
                    { is_active: false },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting comment');
        }
    };
}

module.exports = new Repository();
