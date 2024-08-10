const ApiError = require("../utils/ApiError");
const httpStatus = require("../utils/statusCodes");

/**
 * Service class for managing posts.
 */
class PostService {
    /**
     * Creates an instance of PostService.
     * @param {Object} postRepository - The repository for post data.
     */
    constructor(postRepository) {
        this.postRepository = postRepository;
    };

    /**
     * Creates a new post.
     * @param {string} description - The content of the post.
     * @param {number} userId - The ID of the user creating the post.
     * @param {number} targetId - The ID of the target associated with the post.
     * @param {number} typeId - The ID of the type associated with the post.
     * @returns {Promise<Object>} A promise that resolves to the created post.
     */
    createPost(description, userId, targetId, typeId) {
        return this.postRepository.create(description, userId, targetId, typeId);
    };

    /**
     * Retrieves a post by its ID.
     * @param {number} id - The ID of the post to retrieve.
     * @throws {ApiError} If the post is not found.
     * @returns {Promise<Object>} A promise that resolves to the post with the specified ID.
     */
    async getPostById(id) {
        const post = await this.postRepository.getById(id);
        if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
        return post;
    };

    /**
     * Retrieves all posts for a specific user.
     * @param {number} userId - The ID of the user whose posts are to be retrieved.
     * @returns {Promise<Array>} A promise that resolves to an array of posts for the specified user.
     */
    getAllPosts(userId) {
        return this.postRepository.getAll(userId);
    };

    /**
     * Updates an existing post.
     * @param {number} postId - The ID of the post to update.
     * @param {string} description - The new content of the post.
     * @param {number} targetId - The new target ID associated with the post.
     * @param {number} typeId - The new type ID associated with the post.
     * @throws {ApiError} If the post is not found.
     * @returns {Promise<Object>} A promise that resolves to the updated post.
     */
    async updatePost(postId, description, targetId, typeId) {
        const post = await this.postRepository.getById(postId);
        if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found.');
        return this.postRepository.update(postId, description, targetId, typeId);
    };

    /**
     * Deletes a post by its ID.
     * @param {number} postId - The ID of the post to delete.
     * @throws {ApiError} If the post is not found.
     * @returns {Promise<void>} A promise that resolves when the post is deleted.
     */
    async deletePost(postId) {
        const post = await this.postRepository.getById(postId);
        if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found.');
        await this.postRepository.delete(postId);
    };
}

module.exports = PostService;
