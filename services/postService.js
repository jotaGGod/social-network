const Repository = require('../repositories/postRepository')
const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async createPost(description, user_id, target_id, type_id) {
        return this.postRepository.create(description, user_id, target_id, type_id);
    };
    async getPostById(id) {
        const post = await this.postRepository.getById(id);
        if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
        return post;
    };
    async getAllPosts() {
        return this.postRepository.getAll();
    };
    async updatePost(id, description, user_id, target_id, type_id) {
        const post = await this.postRepository.getById(id);
        if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
        return Repository.update(id, description, user_id, target_id, type_id);
    };
    async deletePost(id) {
        const post = await this.postRepository.getById(id);
        if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
        await this.postRepository.delete(id);
    };
}

module.exports = PostService;
