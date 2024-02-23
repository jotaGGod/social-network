const httpStatus = require('../utils/statusCodes');
const postService = require('../services/postService');

class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async createPost(req, res) {
        const { description, user_id, target_id, type_id } = req.body;
        const post = await this.postService.createPost(description, user_id, target_id, type_id);
        return res.status(httpStatus.CREATED).json({
            message: 'Post created successfully!',
            data: post
        });
    }
    async getPostById(req, res) {
        const { id } = req.params;
        const post = await this.postService.getPostById(id);
        return res.status(httpStatus.OK).json(post);
    }
    async getPosts(req, res) {
        const posts = await this.postService.getAllPosts();
        return res.status(httpStatus.OK).json(posts);
    }
    async updatePost(req, res) {
        const { id } = req.params;
        const { description, user_id, target_id, type_id } = req.body;
        await this.postService.updatePost(id, description, user_id, target_id, type_id);
        return res.status(httpStatus.OK).json({
            details: "Post updated successfully"
        });
    }
    async deletePost(req, res) {
        const { id } = req.params;
        await this.postService.deletePost(id);
        return res.status(httpStatus.OK).json({
            details: "Post deleted successfully"
        });
    }
}

module.exports = PostController;
