const { Comment } = require('../../database/models');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { ICommentRepository } = require("../Interfaces/commentRepositoryAbstract");

class CommentRepositoryImplementation extends ICommentRepository{
    async create(description, user_id, post_id) {
        try {
            return await Comment.sequelize.transaction(async (t) => {
                return Comment.create(
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
        return Comment.findOne(
            {
                where: { id: id },
                attributes: ['id', 'description', 'user_id', 'post_id', 'is_active']
            }
        );
    };
    async getAll(){
        return Comment.findAll(
            { attributes: ['id', 'description', 'user_id', 'post_id', 'is_active'] }
        )
    };
    async update(id, description, user_id, post_id) {
        try {
            await Comment.sequelize.transaction(async (t) => {
                await Comment.update(
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
            await Comment.sequelize.transaction(async (t) => {
                await Comment.update(
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

module.exports = CommentRepositoryImplementation;
