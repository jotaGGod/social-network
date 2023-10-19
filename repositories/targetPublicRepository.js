const TargetPublic = require('../models/target_public');
const Sequelize = require('../models/db');

class Repository {
    async create(type) {
        const t = await Sequelize.transaction();

        const existingTargetPublic = await TargetPublic.findOne({
            where: { type: type, is_active: true}
        });

        if (existingTargetPublic) throw new Error('Target public already exists');


        const targetPublic = await TargetPublic.create(
            {
                type
            },
            { transaction: t }
        );
        await t.commit();

        return targetPublic;
    };
    async getAll(){
        const targetPublic = await TargetPublic.findAll();

        return targetPublic;
    };
    async delete (id) {
        const targetPublic = await TargetPublic.findOne({ where:  { id: id } });

        if (!targetPublic) throw new Error('Target public not found!!');

        await targetPublic.destroy();

        return true;
    };

}

module.exports = new Repository();
