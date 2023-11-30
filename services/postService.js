const Repository = require('../repositories/postRepository')
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class PostService {
    async createPost(description, user_id, target_id, type_id) {
        return Repository.create(description, user_id, target_id, type_id);
    };
    async getPostById(id) {
        const post = await Repository.getById(id);
        if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
        return post;
    };
    async getAllPosts() {
        return Repository.getAll();
    };
    async updatePost(id, description, user_id, target_id, type_id) {
        const post = await Repository.getById(id);
        if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
        return Repository.update(id, description, user_id, target_id, type_id);
    };
    async deletePost(id) {
        const post = await Repository.getById(id);
        if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
        return Repository.delete(id);
    };
}

module.exports = new PostService();
