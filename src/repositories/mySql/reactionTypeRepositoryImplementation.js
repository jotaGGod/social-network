//const { ReactionType } = require('../../../database/models');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IReactionTypeRepository } = require("../interfaces/reactionTypeRepositoryAbstract");

class ReactionTypeRepositoryImplementation extends IReactionTypeRepository {
    async create(description) {
        try {
            return await ReactionType.sequelize.transaction(async (t) => {
                return ReactionType.create(
                    { description },
                    { transaction: t }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating reaction type');
        }
    };
    async getById(id){
        return ReactionType.findOne(
            {
                where: { id: id },
                attributes: ['id', 'description', 'is_active']
            }
        );
    };
    async getAll(){
        return ReactionType.findAll(
            { attributes: ['id', 'description', 'is_active'] }
        );
    };
    async delete (id) {
        try {
            await ReactionType.sequelize.transaction(async (t) => {
                await ReactionType.update(
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

module.exports = ReactionTypeRepositoryImplementation;
