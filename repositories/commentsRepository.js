const Comments = require('../models/comments');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");

class Repository {
    async create(description, user_id, post_id) {
        const t = await Sequelize.transaction();
        const comment = await Comments.create(
            {
                description,
                user_id,
                post_id
            },
            { transaction: t }
        );
        await t.commit();
        return comment;
    };
    async getById(id){
        const comment = await Comments.findOne({ where: { id } });
        if (!comment) throw new ApiError('Comment not found');
        return comment;
    };
    async getAll(){
        return await Comments.findAll()
    };

    async update(id, description, user_id, post_id) {
        const t = await Sequelize.transaction();
        const comment = await Comments.findOne({ where: { id } });
        if (!comment) throw new ApiError('Comment not found');
        comment.set({
            description,
            user_id,
            post_id
        });
        await comment.save({ transaction: t });
        await t.commit()
    };
    async delete (id) {
        const comment = await Comments.findOne({ where: { id } });
        if (!comment) throw new ApiError('Comment not found');
        await comment.destroy();
        return true;
    };
}

module.exports = new Repository();
