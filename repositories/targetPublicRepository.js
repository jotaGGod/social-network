const TargetPublic = require('../models/target_public');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");

class Repository {
    async create(type) {
        const t = await Sequelize.transaction();
        const existingTargetPublic = await TargetPublic.findOne({
            where: { type: type, is_active: true}
        });
        if (existingTargetPublic) throw new ApiError('Target public already exists');
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
        return await TargetPublic.findAll();
    };
    async delete (id) {
        const targetPublic = await TargetPublic.findOne({ where:  { id: id } });
        if (!targetPublic) throw new ApiError('Target public not found!!');
        await targetPublic.destroy();
        return true;
    };
}

module.exports = new Repository();
