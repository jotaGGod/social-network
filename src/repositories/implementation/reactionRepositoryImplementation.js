const db = require('../../database/config/db');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("../../utils/statusCodes");
const { IReactionRepository } = require("../interfaces/reactionRepositoryAbstract");

class ReactionRepositoryImplementation extends IReactionRepository {
    async create(user_id, reaction_type_id, post_id) {
        try {
            const [reaction] = await db.transaction(async (trx) => {
                return db('reaction')
                    .transacting(trx)
                    .insert({
                        user_id,
                        reaction_type_id,
                        post_id
                    });
            });
            return reaction;
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while creating a reaction');
        }
    };

    async getById(id){
        return db('reaction')
            .where({ id })
            .select('id', 'user_id', 'reaction_type_id', 'post_id', 'is_active')
            .first();
    };

    async getAll(){
        return db('reaction')
            .select('id', 'user_id', 'reaction_type_id', 'post_id', 'is_active');
    };

    async update(id, user_id, reaction_type_id, post_id) {
        try {
            await db.transaction(async (trx) => {
                await db('reaction')
                    .where({ id })
                    .update({
                        user_id,
                        reaction_type_id,
                        post_id
                    })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating reaction');
        }
    };

    async delete (id) {
        try {
            await db.transaction(async (trx) => {
                await db('reaction')
                    .where({ id })
                    .update({ is_active: false })
                    .transacting(trx);
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting reaction');
        }
    };
}

module.exports = ReactionRepositoryImplementation;
