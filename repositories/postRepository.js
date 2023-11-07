const Post = require('../models/post');
const httpStatus = require('../utils/statusCodes');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");

class Repository {
    async create(description, user_id, target_id, type_id) {
        const t = await Sequelize.transaction();
        const post = await Post.create(
            {
                description,
                user_id,
                target_id,
                type_id
            },
            { transaction: t }
        );
        await t.commit();
        return post;
    };
    async getById(id){
        const post = await Post.findOne({ where: { id } });
        if (!post) throw new ApiError('Post not found');
        return post;
    };
    async getAll(){
        return await Post.findAll()
    };
    async update(id, description, user_id, target_id, type_id) {
        const t = await Sequelize.transaction();
        const post = await Post.findOne({ where: { id } });
        if (!post) throw new ApiError('Post not found');
        post.set({
            description,
            user_id,
            target_id,
            type_id
        });
        await post.save({ transaction: t });
        await t.commit()
    };
    async delete (id) {
        const post = await Post.findOne({ where: { id } });
        if (!post) throw new ApiError('Post not found');
        await post.destroy();
        return true;
    };
}

module.exports = new Repository();
