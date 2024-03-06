const { Reaction } = require('../../database/models');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IReactionRepository } = require("../interfaces/reactionRepositoryAbstract");

class ReactionRepositoryImplementation extends IReactionRepository{
    async create(user_id, reaction_type_id, post_id) {
        try {
            return await Reaction.sequelize.transaction(async (t) => {
                return Reaction.create(
                    {
                        user_id: user_id,
                        reaction_type_id: reaction_type_id,
                        post_id: post_id
                    }, { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating a reaction');
        }
    };
    async getById(id){
        return Reaction.findOne(
            {
                where: { id: id },
                attributes: ['id', 'user_id', 'reaction_type_id', 'post_id', 'is_active']
            }
        );
    };
    async getAll(){
        return Reaction.findAll(
            { attributes: ['id', 'user_id', 'reaction_type_id', 'post_id', 'is_active'] }
        );
    };
    async update(id, user_id, reaction_type_id, post_id) {
        try {
            await Reaction.sequelize.transaction(async (t) => {
                return Reaction.update(
                    {
                        user_id: user_id,
                        reaction_type_id: reaction_type_id,
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
            await Reaction.sequelize.transaction(async(t) => {
                await Reaction.update(
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

module.exports = ReactionRepositoryImplementation;
