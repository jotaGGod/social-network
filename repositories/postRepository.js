const Post = require('../models/post');
const httpStatus = require('../utils/statusCodes');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");

class Repository {
    async create(description, user_id, target_id, type_id) {
        try {
            return Sequelize.transaction(async (t) => {
                return Post.create(
                    {
                        description: description,
                        user_id: user_id,
                        target_id: target_id,
                        type_id: type_id
                    }, { transaction: t });
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating post');
        }
    };
    async getById(id){
        return Post.findOne(
            {
                where: { id: id },
                attributes: ['id', 'description', 'user_id', 'target_id', 'type_id']
            }
        );
    };
    async getAll(){
        return Post.findAll(
            { attributes: ['id', 'description', 'user_id', 'target_id', 'type_id'] }
        );
    };
    async update(id, description, user_id, target_id, type_id) {
        try {
            return Sequelize.transaction(async (t) => {
                return Post.update(
                    {
                        description: description,
                        user_id: user_id,
                        target_id: target_id,
                        type_id: type_id
                    },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating post');
        }
    };
    async delete (id) {
        try {
            return Sequelize.transaction(async (t) => {
                return await Post.destroy(
                    { where: {id: id} }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting post');
        }
    };
}

module.exports = new Repository();
