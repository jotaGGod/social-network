const httpStatus = require('../utils/statusCodes');

class PostController {
    /**
     * Creates an instance of PostController.
     * @param {object} postService - The post service.
     * @param {object} tokenService - The token service.
     */
    constructor(postService, tokenService) {
        this.postService = postService;
        this.tokenService = tokenService;
    }

    /**
     * Creates a new post.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The created post.
     */
    async createPost(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const { description, target_id: targetId, type_id: typeId } = req.body;
        const post = await this.postService.createPost(description, userId, targetId, typeId);
        return res.status(httpStatus.CREATED).json({
            message: 'Post created successfully!',
            data: post
        });
    }

    /**
     * Gets a post by ID.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The post.
     */
    async getPostById(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        const post = await this.postService.getPostById(id);
        return res.status(httpStatus.OK).json(post);
    }

    /**
     * Gets all posts for a user.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object[]>} The list of posts.
     */
    async getPosts(req, res) {
        const { authorization: token } = req.headers;
        const userId = await this.tokenService.getIdFromToken(token);
        const posts = await this.postService.getAllPosts(userId);
        return res.status(httpStatus.OK).json(posts);
    }

    /**
     * Updates a post.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The update confirmation.
     */
    async updatePost(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        const { description, target_id, type_id } = req.body;
        await this.postService.updatePost(id, description, target_id, type_id);
        return res.status(httpStatus.OK).json({
            details: "Post updated successfully"
        });
    }

    /**
     * Deletes a post.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<object>} The deletion confirmation.
     */
    async deletePost(req, res) {
        const { authorization: token } = req.headers;
        await this.tokenService.verifyToken(token);
        const { id } = req.params;
        await this.postService.deletePost(id);
        return res.status(httpStatus.OK).json({
            details: "Post deleted successfully"
        });
    }
}

module.exports = PostController;
