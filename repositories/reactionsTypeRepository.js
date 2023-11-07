const ReactionsType = require('../models/reactions_type');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");

class Repository {
    async create(description) {
        const t = await Sequelize.transaction();
        const existingReactionType = await ReactionsType.findOne({
            where: { description, is_active: true}
        });
        if (existingReactionType) throw new ApiError('Reaction type already exists');
        const reactionType = await ReactionsType.create(
            {
                description
            },
            { transaction: t }
        );
        await t.commit();
        return reactionType;
    };
    async getAll(){
        return await ReactionsType.findAll();
    };
    async delete (id) {
        const reactionType = await ReactionsType.findOne({ where:  { id: id } });
        if (!reactionType) throw new ApiError('Album item not found!!');
        await reactionType.destroy();
        return true;
    };
}

module.exports = new Repository();
