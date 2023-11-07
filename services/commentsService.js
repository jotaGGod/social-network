const Repository = require('../repositories/commentsRepository');

class CommentsService {
    async createComment(description, user_id, post_id) {
        return Repository.create(description, user_id, post_id);
    };
    async getCommentById(id) {
        return Repository.getById(id);
    };
    async getAllComments() {
        return Repository.getAll();
    };
    async updateComment(id, description, user_id, post_id) {
        return Repository.update(id, description, user_id, post_id);
    };
    async deleteComment(id) {
        return Repository.delete(id);
    };
}

module.exports = new CommentsService();
