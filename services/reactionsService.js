const Repository = require('../repositories/reactionsRepository')

class ReactionsService {
    async createReaction(user_id, reactions_type_id, post_id) {
        return await Repository.create(user_id, reactions_type_id, post_id);
    };
    async getReactionById(id) {
        return Repository.getById(id);
    };
    async getAllReactions() {
        return Repository.getAll();
    };
    async updateReaction(id, user_id, reactions_type_id, post_id) {
        return Repository.update(id, user_id, reactions_type_id, post_id);
    };
    async deleteReaction(id) {
        return Repository.delete(id);
    };
}

module.exports = new ReactionsService();
