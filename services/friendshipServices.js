const Repository = require('../repositories/friendshipRepository')

class FriendshipService {
    async createFriendship(principal_user_id, friend_id) {

        const friendship = await Repository.createFriendship(principal_user_id, friend_id);

        return friendship;
    };

    async getAllFriendships() {
        return Repository.getAll();
    };

    async deleteFriendship(id) {
        return Repository.delete(id);
    };
}

module.exports = new FriendshipService();