const Repository = require('../repositories/friendshipRepository')

class FriendshipService {
    async createFriendship(principal_user_id, friend_id) {
        return await Repository.createFriendship(principal_user_id, friend_id);
    };
    async getAllFriendships() {
        return Repository.getAll();
    };
    async deleteFriendship(id) {
        return Repository.delete(id);
    };
}

module.exports = new FriendshipService();
