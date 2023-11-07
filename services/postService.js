const Repository = require('../repositories/postRepository')

class PostService {
    async createPost(description, user_id, target_id, type_id) {
        return await Repository.create(description, user_id, target_id, type_id);
    };
    async getPostById(id) {
        return Repository.getById(id);
    };
    async getAllPosts() {
        return Repository.getAll();
    };
    async updatePost(id, description, user_id, target_id, type_id) {
        return Repository.update(id, description, user_id, target_id, type_id);
    };
    async deletePost(id) {
        return Repository.delete(id);
    };
}

module.exports = new PostService();
