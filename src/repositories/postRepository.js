const { assertIsInstanceOfContract } = require("./interfaces/validation");

/**
 * Repository implementation for managing posts.
 * @class PostRepository
 */
class PostRepository {
    /**
     * Creates an instance of PostRepository.
     * @param {Object} repository - The repository instance to be used.
     * @param {Function} contract - The contract class that the repository must implement.
     * @throws {Error} Throws an error if the repository is not an instance of the contract class.
     */
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }

    /**
     * Creates a new post.
     * @param {string} description - The content of the post.
     * @param {number} userId - The ID of the user creating the post.
     * @param {number} targetId - The ID of the target associated with the post.
     * @param {number} typeId - The ID of the post type.
     * @returns {Promise} A promise that resolves with the result of the create operation.
     */
    create(description, userId, targetId, typeId) {
        return this.repository.create(description, userId, targetId, typeId);
    }

    /**
     * Retrieves a post by its ID.
     * @param {number} postId - The ID of the post to retrieve.
     * @returns {Promise} A promise that resolves with the post.
     */
    getById(postId) {
        return this.repository.getById(postId);
    }

    /**
     * Retrieves all posts associated with a given user ID.
     * @param {number} userId - The ID of the user to retrieve posts for.
     * @returns {Promise} A promise that resolves with all posts.
     */
    getAll(userId) {
        return this.repository.getAll(userId);
    }

    /**
     * Updates a post by its ID.
     * @param {number} postId - The ID of the post to update.
     * @param {string} description - The new content of the post.
     * @param {number} userId - The ID of the user updating the post.
     * @param {number} targetId - The ID of the target associated with the post.
     * @param {number} typeId - The ID of the post type.
     * @returns {Promise} A promise that resolves when the post is updated.
     */
    update(postId, description, userId, targetId, typeId) {
        return this.repository.update(postId, description, userId, targetId, typeId);
    }

    /**
     * Deletes a post by its ID.
     * @param {number} postId - The ID of the post to delete.
     * @returns {Promise} A promise that resolves when the post is deleted.
     */
    delete(postId) {
        return this.repository.delete(postId);
    }
}

module.exports = PostRepository;
