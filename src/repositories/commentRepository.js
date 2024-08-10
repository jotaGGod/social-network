const { assertIsInstanceOfContract } = require("./interfaces/validation");

/**
 * Repository implementation for managing comments.
 * @class CommentRepository
 */
class CommentRepository {
    /**
     * Creates an instance of CommentRepository.
     * @param {Object} repository - The repository instance to be used.
     * @param {Function} contract - The contract class that the repository must implement.
     * @throws {Error} Throws an error if the repository is not an instance of the contract class.
     */
    constructor(repository, contract) {
        assertIsInstanceOfContract(repository, contract);
        this.repository = repository;
    }

    /**
     * Creates a new comment.
     * @param {string} description - The content of the comment.
     * @param {number} userId - The ID of the user making the comment.
     * @param {number} postId - The ID of the post associated with the comment.
     * @returns {Promise} A promise that resolves with the result of the create operation.
     */
    create(description, userId, postId) {
        return this.repository.create(description, userId, postId);
    }

    /**
     * Retrieves a comment by its ID.
     * @param {number} postId - The ID of the post to retrieve comments from.
     * @returns {Promise} A promise that resolves with the comment.
     */
    getById(postId) {
        return this.repository.getById(postId);
    }

    /**
     * Retrieves all comments associated with a given ID.
     * @param {number} commentId - The ID to retrieve associated comments.
     * @returns {Promise} A promise that resolves with all comments.
     */
    getAll(commentId) {
        return this.repository.getAll(commentId);
    }

    /**
     * Updates a comment by its ID.
     * @param {number} id - The ID of the comment to update.
     * @param {string} description - The new content of the comment.
     * @param {number} userId - The ID of the user making the update.
     * @param {number} postId - The ID of the post associated with the comment.
     * @returns {Promise} A promise that resolves when the comment is updated.
     */
    update(id, description, userId, postId) {
        return this.repository.update(id, description, userId, postId);
    }

    /**
     * Deletes a comment by its ID.
     * @param {number} commentId - The ID of the comment to delete.
     * @returns {Promise} A promise that resolves when the comment is deleted.
     */
    delete(commentId) {
        return this.repository.delete(commentId);
    }
}

module.exports = CommentRepository;
