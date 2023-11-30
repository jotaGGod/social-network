const Repository = require('../repositories/commentsRepository');
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class CommentsService {
    async createComment(description, user_id, post_id) {
        return Repository.create(description, user_id, post_id);
    };
    async getCommentById(id) {
        const comment = await Repository.getById(id);
        if (!comment) throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
        return comment;
    };
    async getAllComments() {
        return Repository.getAll();
    };
    async updateComment(id, description, user_id, post_id) {
        const comment = await Repository.getById(id);
        if (!comment) throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
        return Repository.update(id, description, user_id, post_id);
    };
    async deleteComment(id) {
        const comment = await Repository.getById(id);
        if (!comment) throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
        return Repository.delete(id);
    };
}

module.exports = new CommentsService();
