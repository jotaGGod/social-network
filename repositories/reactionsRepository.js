const Reactions = require('../models/reactions');
const Sequelize = require('../models/db');

class Repository {
    async create(user_id, reactions_type_id, post_id) {
        const t = await Sequelize.transaction();

        const existingReaction = await Reactions.findOne({ where: { user_id, reactions_type_id, post_id } });

        if (existingReaction) throw new Error("Cannot to react twice! Update or delete to change");

        const reaction = await Reactions.create(
            {
                user_id,
                reactions_type_id,
                post_id
            },
            { transaction: t }
        );
        await t.commit();
        return reaction;
    };

    async getById(id){
        const reaction = await Reactions.findOne({ where: { id } });

        if (!reaction) throw new Error('Reaction not found');

        return reaction;
    };
    async getAll(){
        return await Reactions.findAll()
    };

    async update(id, user_id, reactions_type_id, post_id) {
        const t = await Sequelize.transaction();

        const reaction = await Reactions.findOne({ where: { id } });

        if (!reaction) throw new Error('Reaction not found');

        reaction.set({
            user_id,
            reactions_type_id,
            post_id
        });

        await reaction.save({ transaction: t });
        await t.commit()
    };

    async delete (id) {
        const reaction = await Reactions.findOne({ where: { id } });

        if (!reaction) throw new Error('Reaction not found');

        await reaction.destroy();

        return true;
    };

}

module.exports = new Repository();
