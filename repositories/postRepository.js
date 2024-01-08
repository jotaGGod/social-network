const { Post } = require('../database/models');
const httpStatus = require('../utils/statusCodes');
const ApiError = require("../utils/ApiError");

class Repository {
    async create(description, user_id, target_id, type_id) {
        try {
            return await Post.sequelize.transaction(async (t) => {
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
                attributes: ['id', 'description', 'user_id', 'target_id', 'type_id', 'is_active']
            }
        );
    };
    async getAll(){
        return Post.findAll(
            { attributes: ['id', 'description', 'user_id', 'target_id', 'type_id', 'is_active'] }
        );
    };
    async update(id, description, user_id, target_id, type_id) {
        try {
            await Post.sequelize.transaction(async (t) => {
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
            await Post.sequelize.transaction(async (t) => {
                await Post.update(
                    { is_active: false },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting post');
        }
    };
}

module.exports = new Repository();
