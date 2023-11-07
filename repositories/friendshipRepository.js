const Friendship = require('../models/friendship');
const Sequelize = require('../models/db');
const ApiError = require("../utils/ApiError");

class Repository {
    async createFriendship(principal_user_id, friend_id) {
        const t = await Sequelize.transaction();
        const existingFriendship = await Friendship.findOne({
            where: { principal_user_id: principal_user_id, friend_id: friend_id, is_active: true }
        });
        if (existingFriendship) throw new ApiError('Friendship already exists');
        const friendship = await Friendship.create(
            {
                principal_user_id,
                friend_id
            },
            { transaction: t }
        );
        await t.commit();
        return friendship;
    };
    async getAll(){
        return await Friendship.findAll();
    };
    async delete (id) {
        const friendship = await Friendship.findOne({ where:  { id: id } });
        if (!friendship) throw new ApiError('Friendship not found!!');
        await friendship.destroy();
        return true;
    };
}

module.exports = new Repository();
