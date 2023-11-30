const Repository = require('../repositories/friendshipRepository');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");
const userService = require("./userServices");

class FriendshipService {
    async createFriendship(principal_user_id, friend_id) {
        return Repository.createFriendship(principal_user_id, friend_id);
    };
    async getAllFriendships() {
        return Repository.getAll();
    };
    async getById(id){
        const friendship = await Repository.getById(id);
        if (!friendship) throw new ApiError(httpStatus.NOT_FOUND, 'Friendship not found.');
        return friendship;
    };
    async deleteFriendship(id) {
        await this.getById(id);
        return Repository.delete(id);
    };
}

module.exports = new FriendshipService();
