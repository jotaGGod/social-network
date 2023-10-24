const ReactionsType = require('../models/reactions_type');
const Sequelize = require('../models/db');

class Repository {
    async create(description) {
        const t = await Sequelize.transaction();

        const existingReactionType = await ReactionsType.findOne({
            where: { description, is_active: true}
        });

        if (existingReactionType) throw new Error('Reaction type already exists');


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
        const reactionsType = await ReactionsType.findAll();

        return reactionsType;
    };
    async delete (id) {
        const reactionType = await ReactionsType.findOne({ where:  { id: id } });

        if (!reactionType) throw new Error('Album item not found!!');

        await reactionType.destroy();

        return true;
    };

}

module.exports = new Repository();
